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
export class Store {
  readonly state: any;
  subscribe(topic: Topic, reducer: (state: any, action: any) => any): void;
  unsubscribe(topic: Topic): void;
  observe(observer: (state: any) => void): void;
  unobserve(observer: (state: any) => void): void;
  render(element: HTMLElement, renderer: (state: any) => ([HtmlView] | HtmlView));
}

export class Topic {
  readonly scope: TopicScope;
  readonly name: string;
  dispatch(action: any): void;
  addListener(listener: (action: any) => void): void;
  removeListener(listener: (action: any) => void): void;
}

type TopicScope = 'client' | 'session' | 'instance';

export class HtmlView {
  static text(aText: string): HtmlText;

  static a(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static abbr(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static address(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static area(aAttriibutes: [ViewAttribute]): HtmlView;

  static article(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static aside(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static audio(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static b(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static base(aAttriibutes: [ViewAttribute]): HtmlView;

  static bdi(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static bdo(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static blockquote(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static body(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static br(aAttriibutes: [ViewAttribute]): HtmlView;

  static button(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static canvas(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static caption(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static cite(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static code(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static col(aAttriibutes: [ViewAttribute]): HtmlView;

  static colgroup(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static command(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static datalist(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static dd(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static del(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static details(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static dfn(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static dialog(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static div(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static dl(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static dt(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static em(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static embed(aAttriibutes: [ViewAttribute]): HtmlView;

  static fieldset(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static figcaption(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static figure(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static footer(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static form(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static h1(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static h2(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static h3(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static h4(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static h5(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static h6(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static head(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static header(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static hr(aAttriibutes: [ViewAttribute]): HtmlView;

  static html(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static i(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static iframe(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static img(aAttriibutes: [ViewAttribute]): HtmlView;

  static input(aAttriibutes: [ViewAttribute]): HtmlView;

  static ins(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static kbd(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static label(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static legend(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static li(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static link(aAttriibutes: [ViewAttribute]): HtmlView;

  static main(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static map(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static mark(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static menu(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static menuitem(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static meta(aAttriibutes: [ViewAttribute]): HtmlView;

  static meter(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static nav(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static noscript(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static object(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static ol(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static optgroup(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static option(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static output(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static p(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static param(aAttriibutes: [ViewAttribute]): HtmlView;

  static pre(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static progress(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static q(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static rp(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static rt(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static ruby(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static samp(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static script(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static section(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static select(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static small(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static source(aAttriibutes: [ViewAttribute]): HtmlView;

  static span(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static strong(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static style(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static sub(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static summary(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static sup(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static table(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static tbody(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static td(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static textarea(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static tfoot(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static th(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static thead(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static time(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static title(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static tr(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static track(aAttriibutes: [ViewAttribute]): HtmlView;

  static u(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static ul(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static var(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static video(aAttriibutes: [ViewAttribute], aContent: [HtmlView]): HtmlView;

  static wbr(aAttriibutes: [ViewAttribute]): HtmlView;

  readonly tagName: string;
  readonly content: [HtmlView];
  readonly properties: {[property: string]: string};
  readonly styles: {[property: string]: string};
  readonly eventListeners: {[eventName: string]: Function};
  readonly key: string;
}

export class HtmlText extends HtmlView {
  readonly text: string;
}

export class ViewAttribute {
  static key(aKey: string): ViewKey;
  static style(aProperty: string, aValue: string): ViewStyle;
  static property(aProperty: string, aValue: string): ViewProperty;
  static eventListener(aEventName: string, aListener: Function): ViewEventListener;
}

export class ViewKey extends ViewAttribute {
  readonly key: string;
}

export class ViewProperty extends ViewAttribute {
  readonly property: string;
  readonly value: string;
}

export class ViewStyle extends ViewAttribute {
  readonly property: string;
  readonly value: string;
}

export class ViewEventListener extends ViewAttribute {
  readonly eventName: string;
  readonly listener: Function;
}

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
