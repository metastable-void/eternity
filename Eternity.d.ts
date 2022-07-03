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

/**
 * 
 */
export class State {
  constructor(states?: {clientState?: any, sessionState?: any, instanceState?: any});
  clientState: any;
  sessionState: any;
  instanceState: any;
}

class Store {
  subscribe(topic: Topic, reducer: (state: State, action: any) => State);
}

class Topic {
  scope: TopicScope;
  name: string;
  dispatch(action: any);
  addListener(listener: (action: any) => void);
  removeListener(listener: (action: any) => void);
}

type TopicScope = 'client' | 'session' | 'instance';

export class Eternity {
  static TOPIC_SCOPE_CLIENT: 'client';
  static TOPIC_SCOPE_SESSION: 'session';
  static TOPIC_SCOPE_INSTANCE: 'instance';

  clientId: string;
  sessionId: string;
  instanceId: string;

  getStore(name: string): Store;
  getTopic(scope: TopicScope, name: string): Topic;
}
