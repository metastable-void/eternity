/* -*- indent-tabs-mode: nil; tab-width: 2; -*- */
/* vim: set ts=2 sw=2 et ai : */

/**
 * Eternity JS -- minimal Web frontend framework
 * Copyright (C) 2022 Menhera.org
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * @file
 */

import "./es-first-aid.js";

const STORAGE_KEY_SESSION_ID = 'menhera.session_id';
const STORAGE_KEY_CLIENT_ID = 'menhera.client_id';
const STORAGE_KEY_BROADCAST = 'menhera.broadcast';
const STORAGE_KEY_PREFIX_STATE = 'menhera.state';

const TOPIC_SCOPE_CLIENT = 'client';
const TOPIC_SCOPE_SESSION = 'session';
const TOPIC_SCOPE_INSTANCE = 'instance';
const TOPIC_SCOPES = new Set([
  TOPIC_SCOPE_CLIENT,
  TOPIC_SCOPE_SESSION,
  TOPIC_SCOPE_INSTANCE,
]);

/**
 * 
 * @param callback {function}
 * @param args {any[]}
 */
 const callAsync = (callback, ... args) => {
  Promise.resolve()
  .then(() => callback(... args))
  .catch(e => console.error(e));
};


let clientIdCache = null;

/**
* 
* @returns {string}
*/
const getClientId = () => {
  if (clientIdCache) return clientIdCache;
  try {
      const clientId = localStorage.getItem(STORAGE_KEY_CLIENT_ID);
      if (!clientId) throw void 0;
      clientIdCache = clientId;
      return clientId;
  } catch (e) {}
  
  const clientId = firstAid.getRandomUuid();
  clientIdCache = clientId;
  try {
      localStorage.setItem(STORAGE_KEY_CLIENT_ID, clientId);
  } finally {
      return clientId;
  }
};

let sessionIdCache = null;

/**
* 
* @returns {string}
*/
const getSessionId = () => {
  if (sessionIdCache) return sessionIdCache;
  try {
      const sessionId = sessionStorage.getItem(STORAGE_KEY_SESSION_ID);
      if (!sessionId) throw void 0;
      sessionIdCache = sessionId;
      return sessionId;
  } catch (e) {}

  const sessionId = firstAid.getRandomUuid();
  sessionIdCache = sessionId;
  try {
      sessionStorage.setItem(STORAGE_KEY_SESSION_ID, sessionId);
  } finally {
      return sessionId;
  }
};

class CompatBroadcastChannel extends EventTarget {
  constructor(channelName) {
      super();

      if ('string' != typeof channelName) {
          throw new TypeError('Invalid channel name');
      }

      this.channelName = String(channelName).trim().toLowerCase();
      if (!this.channelName) {
          throw new TypeError('Empty channel name');
      }

      window.addEventListener('storage', ev => {
          if (null === ev.key) {
              console.log('The storage was cleared');
              return;
          }
          if (STORAGE_KEY_BROADCAST != ev.key) {
              return;
          }
          if (!ev.newValue) {
              return;
          }

          const {channelName, data} = JSON.parse(ev.newValue);
          if (channelName != this.channelName) {
              return;
          }
          const messageEvent = new MessageEvent('message', {
              data,
              origin: document.origin,
          });
          this.dispatchEvent(messageEvent);
      });
  }

  postMessage(data) {
      const value = JSON.stringify({
          channelName: this.channelName,
          data,
      });
      try {
          localStorage.setItem(STORAGE_KEY_BROADCAST, value);
      } finally {
          const {data} = JSON.parse(value);
          const messageEvent = new MessageEvent('message', {
              data,
              origin: document.origin,
          });
          this.dispatchEvent(messageEvent);
      }
  }
}

class Store {
  #storageKey;
  #stateCache;
  #observers = new Set;
  constructor(app, name) {
    if ('' === name || 'string' != typeof name) {
      throw new TypeError('Invalid Store name');
    }
    this.#storageKey = `${STORAGE_KEY_PREFIX_STATE}.${name}`;
    this.#stateCache = '{}';
  }

  get state() {
    try {
      const json = sessionStorage.getItem(this.#storageKey) || this.#stateCache;
      const state = JSON.parse(json);
      this.#stateCache = JSON.stringify(state);
      return state;
    } catch (e) {
      console.error('Error reading sessionStorage:', e);
      return JSON.parse(this.#stateCache);
    }
  }

  subscribe(topic, reducer) {
    if (!(topic instanceof Topic)) {
      throw new TypeError('Invalid Topic object');
    }
    if ('function' != typeof reducer) {
      throw new TypeError('Reducer must be a function');
    }
    topic.addListener((action) => {
      try {
        const newState = reducer(this.state, action);
        const json = JSON.stringify(newState) || this.#stateCache;
        this.#stateCache = json;
        for (const observer of this.#observers) {
          callAsync(observer, this.state);
        }
        try {
          sessionStorage.setItem(this.#storageKey, json);
        } catch (e) {
          console.error('Error writing sessionStorage:', e);
        }
      } catch (e) {
        console.error('Error calling reducer:', e);
      }
    });
  }

  observe(observer) {
    if ('function' != typeof observer) {
      throw new TypeError('Observer must be a function');
    }
    this.#observers.add(observer);
  }

  unobserve(observer) {
    if ('function' != typeof observer) {
      throw new TypeError('Observer must be a function');
    }
    this.#observers.delete(observer);
  }
}

class Topic {
  #scope;
  #name;
  #broadcastChannel;
  #listenerMap = new WeakMap;

  constructor(app, scope, name) {
    if (!(app instanceof Eternity)) {
      throw new TypeError('Invalid app object');
    }
    if (!TOPIC_SCOPES.has(scope)) {
      throw new TypeError('Invalid scope');
    }
    if ('' === name || 'string' != typeof name) {
      throw new TypeError('Invalid topic name');
    }
    this.#scope = scope;
    this.#name = name;
    switch(scope) {
      case TOPIC_SCOPE_CLIENT: {
        this.#broadcastChannel = new CompatBroadcastChannel(`topic.client.${app.clientId}.${name}`);
        break;
      }
      case TOPIC_SCOPE_SESSION: {
        this.#broadcastChannel = new CompatBroadcastChannel(`topic.session.${app.sessionId}.${name}`);
        break;
      }
      case TOPIC_SCOPE_INSTANCE: {
        this.#broadcastChannel = new CompatBroadcastChannel(`topic.instance.${app.instanceId}.${name}`);
        break;
      }
      default: {
        throw 'This should not happen';
      }
    }
  }

  get scope() {
    return this.#scope;
  }

  get name() {
    return this.#name;
  }

  dispatch(action) {
    this.#broadcastChannel.postMessage(action);
  }

  addListener(listener) {
    if ('function' != typeof listener) {
      throw new TypeError('Listener must be a function');
    }
    const eventHandler = (ev) => {
      callAsync(listener, ev.data);
    };
    this.#listenerMap.set(listener, eventHandler);
    this.#broadcastChannel.addEventListener('message', eventHandler);
  }

  removeListener(listener) {
    if ('function' != typeof listener) {
      throw new TypeError('Listener must be a function');
    }
    const eventHandler = this.#listenerMap.get(listener);
    if (!eventHandler) {
      try {
        this.#broadcastChannel.removeEventListener('message', eventHandler);
      } catch (e) {}
    }
  }
}

export class Eternity {
  #instanceId;

  static get TOPIC_SCOPE_CLIENT() {
    return TOPIC_SCOPE_CLIENT;
  }

  static get TOPIC_SCOPE_SESSION() {
    return TOPIC_SCOPE_SESSION;
  }

  static get TOPIC_SCOPE_INSTANCE() {
    return TOPIC_SCOPE_INSTANCE;
  }

  constructor() {
    this.#instanceId = firstAid.getRandomUuid();
  }

  get clientId() {
    return getClientId();
  }

  get sessionId() {
    return getSessionId();
  }

  get instanceId() {
    return this.#instanceId;
  }

  getStore(name) {
    return new Store(this, name);
  }

  getTopic(scope, name) {
    return new Topic(this, scope, name);
  }
}
