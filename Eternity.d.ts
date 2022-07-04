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
class Store {
  readonly state: any;
  subscribe(topic: Topic, reducer: (state: any, action: any) => any): void;
  unsubscribe(topic: Topic): void;
  observe(observer: (state: any) => void): void;
  unobserve(observer: (state: any) => void): void;
}

class Topic {
  readonly scope: TopicScope;
  readonly name: string;
  dispatch(action: any): void;
  addListener(listener: (action: any) => void): void;
  removeListener(listener: (action: any) => void): void;
}

type TopicScope = 'client' | 'session' | 'instance';

export class Eternity {
  static readonly TOPIC_SCOPE_CLIENT: 'client';
  static readonly TOPIC_SCOPE_SESSION: 'session';
  static readonly TOPIC_SCOPE_INSTANCE: 'instance';

  readonly clientId: string;
  readonly sessionId: string;
  readonly instanceId: string;

  getStore(name: string, initializer: (state: any) => any): Store;
  getTopic(scope: TopicScope, name: string): Topic;
}
