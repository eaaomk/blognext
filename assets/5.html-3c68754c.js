const e=JSON.parse('{"key":"v-16b00f88","path":"/posts/java/5.html","title":"设计模式3","lang":"zh-CN","frontmatter":{"lastUpdated":true,"description":"设计模式3 责任链模式（Chain of Responsibility Pattern） 这些设计模式特别关注对象之间的通信。 顾名思义，责任链模式（Chain of Responsibility Pattern）为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。这种类型的设计模式属于行为型模式。 在这种模式中，通常每个接收者都包含对另一个接收者的引用。如果一个对象不能处理该请求，那么它会把相同的请求传给下一个接收者，依此类推。 意图：避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。 主要解决：职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。 何时使用：在处理消息的时候以过滤很多道。 如何解决：拦截的类都实现统一接口。 关键代码：Handler 里面聚合它自己，在 HandlerRequest 里判断是否合适，如果没达到条件则向下传递，向谁传递之前 set 进去。 应用实例： 1、红楼梦中的\\"击鼓传花\\"。 2、JS 中的事件冒泡。 3、JAVA WEB 中 Apache Tomcat 对 Encoding 的处理，Struts2 的拦截器，jsp servlet 的 Filter。 优点： 1、降低耦合度。它将请求的发送者和接收者解耦。 2、简化了对象。使得对象不需要知道链的结构。 3、增强给对象指派职责的灵活性。通过改变链内的成员或者调动它们的次序，允许动态地新增或者删除责任。 4、增加新的请求处理类很方便。 缺点： 1、不能保证请求一定被接收。 2、系统性能将受到一定影响，而且在进行代码调试时不太方便，可能会造成循环调用。 3、可能不容易观察运行时的特征，有碍于除错。 使用场景： 1、有多个对象可以处理同一个请求，具体哪个对象处理该请求由运行时刻自动确定。 2、在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。 3、可动态指定一组对象处理请求。 注意事项：在 JAVA WEB 中遇到很多应用。","head":[["meta",{"property":"og:url","content":"https://eaaomk.github.io/blognext/blognext/posts/java/5.html"}],["meta",{"property":"og:site_name","content":"欢迎你"}],["meta",{"property":"og:title","content":"设计模式3"}],["meta",{"property":"og:description","content":"设计模式3 责任链模式（Chain of Responsibility Pattern） 这些设计模式特别关注对象之间的通信。 顾名思义，责任链模式（Chain of Responsibility Pattern）为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。这种类型的设计模式属于行为型模式。 在这种模式中，通常每个接收者都包含对另一个接收者的引用。如果一个对象不能处理该请求，那么它会把相同的请求传给下一个接收者，依此类推。 意图：避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。 主要解决：职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。 何时使用：在处理消息的时候以过滤很多道。 如何解决：拦截的类都实现统一接口。 关键代码：Handler 里面聚合它自己，在 HandlerRequest 里判断是否合适，如果没达到条件则向下传递，向谁传递之前 set 进去。 应用实例： 1、红楼梦中的\\"击鼓传花\\"。 2、JS 中的事件冒泡。 3、JAVA WEB 中 Apache Tomcat 对 Encoding 的处理，Struts2 的拦截器，jsp servlet 的 Filter。 优点： 1、降低耦合度。它将请求的发送者和接收者解耦。 2、简化了对象。使得对象不需要知道链的结构。 3、增强给对象指派职责的灵活性。通过改变链内的成员或者调动它们的次序，允许动态地新增或者删除责任。 4、增加新的请求处理类很方便。 缺点： 1、不能保证请求一定被接收。 2、系统性能将受到一定影响，而且在进行代码调试时不太方便，可能会造成循环调用。 3、可能不容易观察运行时的特征，有碍于除错。 使用场景： 1、有多个对象可以处理同一个请求，具体哪个对象处理该请求由运行时刻自动确定。 2、在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。 3、可动态指定一组对象处理请求。 注意事项：在 JAVA WEB 中遇到很多应用。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-29T13:57:58.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-29T13:57:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"设计模式3\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-01-29T13:57:58.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"责任链模式（Chain of Responsibility Pattern）","slug":"责任链模式-chain-of-responsibility-pattern","link":"#责任链模式-chain-of-responsibility-pattern","children":[{"level":3,"title":"实现","slug":"实现","link":"#实现","children":[]}]},{"level":2,"title":"命令模式（Command Pattern）","slug":"命令模式-command-pattern","link":"#命令模式-command-pattern","children":[{"level":3,"title":"实现","slug":"实现-1","link":"#实现-1","children":[]}]},{"level":2,"title":"解释器模式（Interpreter Pattern）","slug":"解释器模式-interpreter-pattern","link":"#解释器模式-interpreter-pattern","children":[{"level":3,"title":"实现","slug":"实现-2","link":"#实现-2","children":[]}]},{"level":2,"title":"迭代器模式（Iterator Pattern）","slug":"迭代器模式-iterator-pattern","link":"#迭代器模式-iterator-pattern","children":[{"level":3,"title":"实现","slug":"实现-3","link":"#实现-3","children":[]}]},{"level":2,"title":"中介者模式（Mediator Pattern）","slug":"中介者模式-mediator-pattern","link":"#中介者模式-mediator-pattern","children":[{"level":3,"title":"实现","slug":"实现-4","link":"#实现-4","children":[]}]},{"level":2,"title":"备忘录模式（Memento Pattern）","slug":"备忘录模式-memento-pattern","link":"#备忘录模式-memento-pattern","children":[{"level":3,"title":"实现","slug":"实现-5","link":"#实现-5","children":[]}]},{"level":2,"title":"观察者模式（Observer Pattern）","slug":"观察者模式-observer-pattern","link":"#观察者模式-observer-pattern","children":[{"level":3,"title":"实现","slug":"实现-6","link":"#实现-6","children":[]}]},{"level":2,"title":"状态模式（State Pattern）","slug":"状态模式-state-pattern","link":"#状态模式-state-pattern","children":[{"level":3,"title":"实现","slug":"实现-7","link":"#实现-7","children":[]}]},{"level":2,"title":"空对象模式（Null Object Pattern）","slug":"空对象模式-null-object-pattern","link":"#空对象模式-null-object-pattern","children":[{"level":3,"title":"实现","slug":"实现-8","link":"#实现-8","children":[]}]},{"level":2,"title":"策略模式（Strategy Pattern）","slug":"策略模式-strategy-pattern","link":"#策略模式-strategy-pattern","children":[{"level":3,"title":"实现","slug":"实现-9","link":"#实现-9","children":[]}]},{"level":2,"title":"模板模式（Template Pattern）","slug":"模板模式-template-pattern","link":"#模板模式-template-pattern","children":[{"level":3,"title":"实现","slug":"实现-10","link":"#实现-10","children":[]}]},{"level":2,"title":"访问者模式（Visitor Pattern）","slug":"访问者模式-visitor-pattern","link":"#访问者模式-visitor-pattern","children":[{"level":3,"title":"实现","slug":"实现-11","link":"#实现-11","children":[]}]}],"git":{"createdTime":1675000678000,"updatedTime":1675000678000,"contributors":[{"name":"qiang.zhang","email":"eaaomk@163.com","commits":1}]},"readingTime":{"minutes":30.95,"words":9285},"filePathRelative":"posts/java/5.md","localizedDate":"2023年1月29日","excerpt":"<h1> 设计模式3</h1>\\n<h2> 责任链模式（Chain of Responsibility Pattern）</h2>\\n<ul>\\n<li>这些设计模式特别关注对象之间的通信。</li>\\n</ul>\\n<p>顾名思义，责任链模式（Chain of Responsibility Pattern）为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。这种类型的设计模式属于行为型模式。</p>\\n<p>在这种模式中，通常每个接收者都包含对另一个接收者的引用。如果一个对象不能处理该请求，那么它会把相同的请求传给下一个接收者，依此类推。</p>\\n<ul>\\n<li>\\n<p>意图：避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。</p>\\n</li>\\n<li>\\n<p>主要解决：职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。</p>\\n</li>\\n<li>\\n<p>何时使用：在处理消息的时候以过滤很多道。</p>\\n</li>\\n<li>\\n<p>如何解决：拦截的类都实现统一接口。</p>\\n</li>\\n<li>\\n<p>关键代码：Handler 里面聚合它自己，在 HandlerRequest 里判断是否合适，如果没达到条件则向下传递，向谁传递之前 set 进去。</p>\\n</li>\\n<li>\\n<p>应用实例：</p>\\n<ul>\\n<li>1、红楼梦中的\\"击鼓传花\\"。</li>\\n<li>2、JS 中的事件冒泡。</li>\\n<li>3、JAVA WEB 中 Apache Tomcat 对 Encoding 的处理，Struts2 的拦截器，jsp servlet 的 Filter。</li>\\n</ul>\\n</li>\\n<li>\\n<p>优点：</p>\\n<ul>\\n<li>1、降低耦合度。它将请求的发送者和接收者解耦。</li>\\n<li>2、简化了对象。使得对象不需要知道链的结构。</li>\\n<li>3、增强给对象指派职责的灵活性。通过改变链内的成员或者调动它们的次序，允许动态地新增或者删除责任。</li>\\n<li>4、增加新的请求处理类很方便。</li>\\n</ul>\\n</li>\\n<li>\\n<p>缺点：</p>\\n<ul>\\n<li>1、不能保证请求一定被接收。</li>\\n<li>2、系统性能将受到一定影响，而且在进行代码调试时不太方便，可能会造成循环调用。</li>\\n<li>3、可能不容易观察运行时的特征，有碍于除错。</li>\\n</ul>\\n</li>\\n<li>\\n<p>使用场景：</p>\\n<ul>\\n<li>1、有多个对象可以处理同一个请求，具体哪个对象处理该请求由运行时刻自动确定。</li>\\n<li>2、在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。</li>\\n<li>3、可动态指定一组对象处理请求。</li>\\n</ul>\\n</li>\\n<li>\\n<p>注意事项：在 JAVA WEB 中遇到很多应用。</p>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
