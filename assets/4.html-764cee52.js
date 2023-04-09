import{_ as e,V as p,W as t,X as n,Y as s,$ as o,a0 as c,Z as l,F as i}from"./framework-bcbeea85.js";const u="/blognext/images/handler-1-0.png",k="/blognext/images/handler-0.png",r={},d=n("h1",{id:"handler",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#handler","aria-hidden":"true"},"#"),s(" Handler")],-1),v=n("p",null,"Handler主要用于异步消息的处理：当发出一个消息之后，首先进入一个消息队列，发送消息的函数即刻返回，而另外一个部分在消息队列中逐一将消息取出，然后对消息进行处理，也就是发送消息和接收消息不是同步的处理。 这种机制通常用来处理相对耗时比较长的操作。",-1),m=n("h3",{id:"handler-相关介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#handler-相关介绍","aria-hidden":"true"},"#"),s(" Handler 相关介绍")],-1),b=n("li",null,[s("先看粗糙版本的类图 "),n("img",{src:u,alt:"avatar",loading:"lazy"})],-1),g=l(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//frameworks/base/core/java/android/os/Looper.java</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Looper</span> <span class="token function">myLooper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sThreadLocal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这里可以清晰的看见，我们的looper 是存储在Thread线程中的</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//libcore/ojluni/src/main/java/java/lang/ThreadLocal.java</span>
<span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ThreadLocalMap</span> map <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>map <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ThreadLocalMap<span class="token punctuation">.</span>Entry</span> e <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
            <span class="token class-name">T</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span>e<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">setInitialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">ThreadLocalMap</span> <span class="token function">getMap</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> t<span class="token punctuation">.</span>threadLocals<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在MessageQueue 中，包含了Message属性，它是以一个链表的形式存在的，这个链表里面存储的是按照时间顺序排列好的一堆Message 消息,在next 字段中存储了下一个Message对象</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//frameworks/base/core/java/android/os/Handler.java</span>
<span class="token keyword">public</span> <span class="token class-name">Handler</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NonNull</span> <span class="token class-name">Looper</span> looper<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Callback</span> callback<span class="token punctuation">,</span> <span class="token keyword">boolean</span> async<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mLooper <span class="token operator">=</span> looper<span class="token punctuation">;</span>
        mQueue <span class="token operator">=</span> looper<span class="token punctuation">.</span>mQueue<span class="token punctuation">;</span>
        mCallback <span class="token operator">=</span> callback<span class="token punctuation">;</span>
        mAsynchronous <span class="token operator">=</span> async<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>首先我们需要注意的是，Handler 必须拥有一个looper，这个looper 并不归属于Handler ，它是由线程Thread 管理的。</p></li><li><p>looper 是放在了当前线程的threadLocals 属性中的，所以如果想在一个线程中使用Handler ，首先要保证这个线程初始化了这个looper 对象.</p></li><li><p>需要知道的是，一个线程中只会存在一个looper 对象，不能被多次初始化。</p></li><li><p>一个looper 对象可以被多个Handler 对象使用，也就是一个线程中可以有多个handler 对象</p></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// frameworks/base/core/java/android/os/Looper.java</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> quitAllowed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sThreadLocal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果不为空，则抛出异常,有效避免被多次初始化</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Only one Looper may be created per thread&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    sThreadLocal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Looper</span><span class="token punctuation">(</span>quitAllowed<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+k+`" alt="avatar" tabindex="0" loading="lazy"><figcaption>avatar</figcaption></figure><ul><li>handler 所做的事情就是将消息按照时间顺序放在当前线程的looper中的消息队列中，随后发送消息的函数立即返回，当前线程的职责就此结束，不需要做其他耗时处理。在主线程中，会有一个循环的代码，一直轮询这个消息队列，当有消息来时，就处理这个消息，这样我们就实现了线程的切换。</li><li>值得注意的是主线程中的looper 会一直循环下去，并不会退出，一旦退出，那么我们的app 就退出了。所以在looper 循环读取消息的过程中，有一个mQuitAllowed变量，当这个变量为false 的时候，即使线程中的消息队列没有消息，它也不会退出循环，而是一直等待在next() 方法中.</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">prepareMainLooper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 主线程不能退出，故需要传入false</span>
    <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Looper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>sMainLooper <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;The main Looper has already been prepared.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        sMainLooper <span class="token operator">=</span> <span class="token function">myLooper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="activitythread-中的handler" tabindex="-1"><a class="header-anchor" href="#activitythread-中的handler" aria-hidden="true">#</a> ActivityThread 中的Handler</h3><ul><li>在ActivityThread 的main 方法中,可以看见，调用了prepareMainLooper函数对当前线程(这里我们称为主线程)的looper的初始化，中间进行了一系列的其他初始化操作，随后调用loop 函数进行消息队列的循环，如果主线程结束了这个循环，那么程序就会抛出异常，因为我们主线程的looper 不应该在这里退出。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// frameworks/base/core/java/android/app/ActivityThread.java</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token comment">//modify for prefork blank process end</span>
    <span class="token class-name">Looper</span><span class="token punctuation">.</span><span class="token function">prepareMainLooper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token class-name">ActivityThread</span> thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ActivityThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token comment">/// 开启消息循环</span>
    <span class="token class-name">Looper</span><span class="token punctuation">.</span><span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/// 如果退出循环，我们的程序就结束了，抛出异常</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Main thread loop unexpectedly exited&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>looper 循环开启</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//frameworks/base/core/java/android/os/Looper.java</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/// 获取当前线程的looper 对象</span>
    <span class="token keyword">final</span> <span class="token class-name">Looper</span> me <span class="token operator">=</span> <span class="token function">myLooper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>me <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// looper 对象为空</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;No Looper; Looper.prepare() wasn&#39;t called on this thread.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>me<span class="token punctuation">.</span>mInLoop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 已经开启了消息循环</span>
        <span class="token class-name">Slog</span><span class="token punctuation">.</span><span class="token function">w</span><span class="token punctuation">(</span><span class="token constant">TAG</span><span class="token punctuation">,</span> <span class="token string">&quot;Loop again would have the queued messages be executed&quot;</span>
                <span class="token operator">+</span> <span class="token string">&quot; before this one completed.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 标志正在循环</span>
    me<span class="token punctuation">.</span>mInLoop <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取消息队列的链表头部</span>
    <span class="token keyword">final</span> <span class="token class-name">MessageQueue</span> queue <span class="token operator">=</span> me<span class="token punctuation">.</span>mQueue<span class="token punctuation">;</span>

    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

    <span class="token keyword">boolean</span> slowDeliveryDetected <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里将有可能会产生阻塞</span>
        <span class="token class-name">Message</span> msg <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// might block</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>msg <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// No message indicates that the message queue is quitting.</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">/// 开始分发消息，将调用对应的target目标处理这个消息</span>
            msg<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">dispatchMessage</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>observer <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                observer<span class="token punctuation">.</span><span class="token function">messageDispatched</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            dispatchEnd <span class="token operator">=</span> needEndTime <span class="token operator">?</span> <span class="token class-name">SystemClock</span><span class="token punctuation">.</span><span class="token function">uptimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>observer <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                observer<span class="token punctuation">.</span><span class="token function">dispatchingThrewException</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> msg<span class="token punctuation">,</span> exception<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">throw</span> exception<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">ThreadLocalWorkSource</span><span class="token punctuation">.</span><span class="token function">restore</span><span class="token punctuation">(</span>origWorkSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>traceTag <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Trace</span><span class="token punctuation">.</span><span class="token function">traceEnd</span><span class="token punctuation">(</span>traceTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        
        <span class="token comment">// 回收消息</span>
        msg<span class="token punctuation">.</span><span class="token function">recycleUnchecked</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>分析一下next()函数，取出下一条消息</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Message</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//当queue退出的时候，ptr被置为0，这时返回null，此时looper也会退出循环</span>
    <span class="token keyword">final</span> <span class="token keyword">long</span> ptr <span class="token operator">=</span> mPtr<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ptr <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">int</span> pendingIdleHandlerCount <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// -1 only during first iteration</span>
    <span class="token keyword">int</span> nextPollTimeoutMillis <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nextPollTimeoutMillis <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Binder</span><span class="token punctuation">.</span><span class="token function">flushPendingCommands</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">nativePollOnce</span><span class="token punctuation">(</span>ptr<span class="token punctuation">,</span> nextPollTimeoutMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            
            <span class="token keyword">final</span> <span class="token keyword">long</span> now <span class="token operator">=</span> <span class="token class-name">SystemClock</span><span class="token punctuation">.</span><span class="token function">uptimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Message</span> prevMsg <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
             <span class="token comment">//拿到链表头节点</span>
            <span class="token class-name">Message</span> msg <span class="token operator">=</span> mMessages<span class="token punctuation">;</span>
            <span class="token comment">//判断是不是屏障消息，如果则遍历链表找到异步消息，优先执行</span>
            <span class="token comment">//1.屏障消息的target为空，并且是直接插入到消息队列头部，目的是为了让绘制任务尽快被执行</span>
            <span class="token comment">//2.当系统有屏幕绘制请求时，会发送一个屏障消息到消息队列</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>msg <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> msg<span class="token punctuation">.</span>target <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               
                <span class="token keyword">do</span> <span class="token punctuation">{</span>
                    prevMsg <span class="token operator">=</span> msg<span class="token punctuation">;</span>
                    msg <span class="token operator">=</span> msg<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>msg <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>msg<span class="token punctuation">.</span><span class="token function">isAsynchronous</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>msg <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">&lt;</span> msg<span class="token punctuation">.</span>when<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">//如果没到消息的执行时间，则进行等待</span>
                    nextPollTimeoutMillis <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>when <span class="token operator">-</span> now<span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Got a message.</span>
                    mBlocked <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>prevMsg <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">//将异步消息移除</span>
                        prevMsg<span class="token punctuation">.</span>next <span class="token operator">=</span> msg<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token comment">//设置新的链头  指向下一个消息</span>
                        mMessages <span class="token operator">=</span> msg<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">//移除该消息后面的链</span>
                    msg<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">DEBUG</span><span class="token punctuation">)</span> <span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">v</span><span class="token punctuation">(</span><span class="token constant">TAG</span><span class="token punctuation">,</span> <span class="token string">&quot;Returning message: &quot;</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 标志此msg 正式被使用</span>
                    msg<span class="token punctuation">.</span><span class="token function">markInUse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 返回给loop 循环函数，让其执行消息处理</span>
                    <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// No more messages.</span>
                nextPollTimeoutMillis <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Process the quit message now that all pending messages have been handled.</span>
            <span class="token comment">// 如果正在退出，需要dispose ，并返回一个null ，结束主线程的looper 循环</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>mQuitting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// If first time idle, then get the number of idlers to run.</span>
            <span class="token comment">// Idle handles only run if the queue is empty or if the first message</span>
            <span class="token comment">// in the queue (possibly a barrier) is due to be handled in the future.</span>
            <span class="token comment">//初始化闲时任务mPendingIdleHandlers，即当消息队列没有需要处理的消息时，</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pendingIdleHandlerCount <span class="token operator">&lt;</span> <span class="token number">0</span>
                    <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>mMessages <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> now <span class="token operator">&lt;</span> mMessages<span class="token punctuation">.</span>when<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                pendingIdleHandlerCount <span class="token operator">=</span> mIdleHandlers<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pendingIdleHandlerCount <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// No idle handlers to run.  Loop and wait some more.</span>
                mBlocked <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>mPendingIdleHandlers <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                mPendingIdleHandlers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IdleHandler</span><span class="token punctuation">[</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>pendingIdleHandlerCount<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            mPendingIdleHandlers <span class="token operator">=</span> mIdleHandlers<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span>mPendingIdleHandlers<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Run the idle handlers.</span>
        <span class="token comment">// We only ever reach this code block during the first iteration.</span>
        <span class="token comment">// 处理闲时任务</span>
    
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> pendingIdleHandlerCount<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">final</span> <span class="token class-name">IdleHandler</span> idler <span class="token operator">=</span> mPendingIdleHandlers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            mPendingIdleHandlers<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// release the reference to the handler</span>

            <span class="token keyword">boolean</span> keep <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token comment">//如果queueIdle返回true，代表保留该任务，false则执行完了就移除任务</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                keep <span class="token operator">=</span> idler<span class="token punctuation">.</span><span class="token function">queueIdle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">wtf</span><span class="token punctuation">(</span><span class="token constant">TAG</span><span class="token punctuation">,</span> <span class="token string">&quot;IdleHandler threw exception&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>keep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    mIdleHandlers<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>idler<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Reset the idle handler count to 0 so we do not run them again.</span>
        pendingIdleHandlerCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token comment">// While calling an idle handler, a new message could have been delivered</span>
        <span class="token comment">// so go back and look again for a pending message without waiting.</span>
        nextPollTimeoutMillis <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>这个闲时任务有些鸡肋，当主线程繁忙的时候，它可能一直得不到执行，而当主线程闲的时候，如果我们没有将它移除的话，它可能很快地被执行多次。由于它执行时机的不确定性，暂时想不到很好的应用场景，以至于不看源码几乎不知道还有这么个机制。</p></li><li><p>分析一下发送消息的函数</p></li><li><p>我们在发送消息的时候最终都会调用sendMessageAtTime函数，最终都会走到enqueueMessage函数中</p></li><li><p>Handler中的enqueueMessage 会调用queue中的enqueueMessage函数</p></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// frameworks/base/core/java/android/os/Handler.java</span>

<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">sendMessageAtTime</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NonNull</span> <span class="token class-name">Message</span> msg<span class="token punctuation">,</span> <span class="token keyword">long</span> uptimeMillis<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MessageQueue</span> queue <span class="token operator">=</span> mQueue<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>queue <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 检测到没有消息队列，抛出异常</span>
        <span class="token class-name">RuntimeException</span> e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>
                <span class="token keyword">this</span> <span class="token operator">+</span> <span class="token string">&quot; sendMessageAtTime() called with no mQueue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">w</span><span class="token punctuation">(</span><span class="token string">&quot;Looper&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">enqueueMessage</span><span class="token punctuation">(</span>queue<span class="token punctuation">,</span> msg<span class="token punctuation">,</span> uptimeMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">enqueueMessage</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NonNull</span> <span class="token class-name">MessageQueue</span> queue<span class="token punctuation">,</span> <span class="token annotation punctuation">@NonNull</span> <span class="token class-name">Message</span> msg<span class="token punctuation">,</span>
            <span class="token keyword">long</span> uptimeMillis<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将msg 的target 指定为当前的handler </span>
        msg<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        msg<span class="token punctuation">.</span>workSourceUid <span class="token operator">=</span> <span class="token class-name">ThreadLocalWorkSource</span><span class="token punctuation">.</span><span class="token function">getUid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>mAsynchronous<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            msg<span class="token punctuation">.</span><span class="token function">setAsynchronous</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> queue<span class="token punctuation">.</span><span class="token function">enqueueMessage</span><span class="token punctuation">(</span>msg<span class="token punctuation">,</span> uptimeMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>重点查看一下MessageQueue函数</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// frameworks/base/core/java/android/os/MessageQueue.java</span>
<span class="token keyword">boolean</span> <span class="token function">enqueueMessage</span><span class="token punctuation">(</span><span class="token class-name">Message</span> msg<span class="token punctuation">,</span> <span class="token keyword">long</span> when<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断target 是否为空，因为最终处理消息的还是这个target对象在处理</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>msg<span class="token punctuation">.</span>target <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Message must have a target.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 是否已经在被使用了</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>msg<span class="token punctuation">.</span><span class="token function">isInUse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span>msg <span class="token operator">+</span> <span class="token string">&quot; This message is already in use.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 如果正在退出，直接回收掉这个msg消息,并返回false </span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mQuitting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">IllegalStateException</span> e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span>
                    msg<span class="token punctuation">.</span>target <span class="token operator">+</span> <span class="token string">&quot; sending message to a Handler on a dead thread&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">w</span><span class="token punctuation">(</span><span class="token constant">TAG</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            msg<span class="token punctuation">.</span><span class="token function">recycle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 标记消息正在被使用</span>
        msg<span class="token punctuation">.</span><span class="token function">markInUse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置消息被处理的时间</span>
        msg<span class="token punctuation">.</span>when <span class="token operator">=</span> when<span class="token punctuation">;</span>
        <span class="token class-name">Message</span> p <span class="token operator">=</span> mMessages<span class="token punctuation">;</span>
        <span class="token comment">//是否需要唤醒事件队列，其实也就是唤醒queue.next()</span>
        <span class="token keyword">boolean</span> needWake<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> when <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> when <span class="token operator">&lt;</span> p<span class="token punctuation">.</span>when<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// New head, wake up the event queue if blocked.</span>
            <span class="token comment">// 如果当前头节点为空或者消息的时间最小，则新加入的消息作为头节点</span>
            <span class="token comment">// 消息队列是一个以消息时间排序的链表，时间最小的位于最前面，最先被调度</span>
            msg<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">;</span>
            mMessages <span class="token operator">=</span> msg<span class="token punctuation">;</span>
            needWake <span class="token operator">=</span> mBlocked<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// Inserted within the middle of the queue.  Usually we don&#39;t have to wake</span>
            <span class="token comment">// up the event queue unless there is a barrier at the head of the queue</span>
            <span class="token comment">// and the message is the earliest asynchronous message in the queue.</span>
            needWake <span class="token operator">=</span> mBlocked <span class="token operator">&amp;&amp;</span> p<span class="token punctuation">.</span>target <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> msg<span class="token punctuation">.</span><span class="token function">isAsynchronous</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Message</span> prev<span class="token punctuation">;</span>
            <span class="token comment">// 根据时间查找新消息在链表中的位置</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                prev <span class="token operator">=</span> p<span class="token punctuation">;</span>
                p <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> when <span class="token operator">&lt;</span> p<span class="token punctuation">.</span>when<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">//当遍历到链表尾部，或者找到合适的位置</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>needWake <span class="token operator">&amp;&amp;</span> p<span class="token punctuation">.</span><span class="token function">isAsynchronous</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    needWake <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//插入新消息到链表中</span>
            msg<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">;</span> <span class="token comment">// invariant: p == prev.next</span>
            prev<span class="token punctuation">.</span>next <span class="token operator">=</span> msg<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//根据情况唤醒事件队列</span>
        <span class="token comment">// We can assume mPtr != 0 because mQuitting is false.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>needWake<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">nativeWake</span><span class="token punctuation">(</span>mPtr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="message-详细解析" tabindex="-1"><a class="header-anchor" href="#message-详细解析" aria-hidden="true">#</a> Message 详细解析</h3><p>尽管Message本身的构造方式是公共的，但实现Message对象的最好方法确实是通过Message.obtain()函数返回，或者通过Handler.obtainMessage()方法，这个函数最终还是调用了obtain函数。</p><ul><li>享元模式的应用</li><li>Message 消息池其实是一个链表,它自带的一个属性 next 字段指向下一个Message</li><li>对同步锁不清楚的读者请移步同步锁相关系列的文章</li><li>Message 实现了 Parcelable 接口</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// frameworks/base/core/java/android/os/Message.java</span>
    <span class="token comment">// 一般应用层开发者用来指定消息类型，可以自定义</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> what<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@UnsupportedAppUsage</span>
    <span class="token annotation punctuation">@VisibleForTesting</span><span class="token punctuation">(</span>visibility <span class="token operator">=</span> <span class="token class-name">VisibleForTesting<span class="token punctuation">.</span>Visibility</span><span class="token punctuation">.</span><span class="token constant">PACKAGE</span><span class="token punctuation">)</span>
    <span class="token comment">//消息发送的时间戳</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> when<span class="token punctuation">;</span>
    <span class="token comment">// 数据</span>
    <span class="token comment">/*package*/</span> <span class="token class-name">Bundle</span> data<span class="token punctuation">;</span>
    <span class="token comment">// 目标handler </span>
    <span class="token annotation punctuation">@UnsupportedAppUsage</span>
    <span class="token comment">/*package*/</span> <span class="token class-name">Handler</span> target<span class="token punctuation">;</span>

    <span class="token comment">// 回调函数</span>
    <span class="token annotation punctuation">@UnsupportedAppUsage</span>
    <span class="token comment">/*package*/</span> <span class="token class-name">Runnable</span> callback<span class="token punctuation">;</span>

    <span class="token comment">// sometimes we store linked lists of these things</span>
    <span class="token annotation punctuation">@UnsupportedAppUsage</span>
    <span class="token comment">/*package*/</span> <span class="token class-name">Message</span> next<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/** <span class="token keyword">@hide</span> */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> sPoolSync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Message</span> sPool<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> sPoolSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">///当前消息池有多少MSG</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">MAX_POOL_SIZE</span> <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span> <span class="token comment">/// 消息池大小</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> gCheckRecycle <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Message</span> <span class="token function">obtain</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>sPoolSync<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sPool <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 取出链表第一个msg 并清空</span>
                <span class="token class-name">Message</span> m <span class="token operator">=</span> sPool<span class="token punctuation">;</span>
                sPool <span class="token operator">=</span> m<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                m<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                m<span class="token punctuation">.</span>flags <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// clear in-use flag</span>
                sPoolSize<span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> m<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Message</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>先是一个对象的同步锁，如果sPools不为空的话，把sPools赋值给Message，并把Message的next赋值给sPool，当前Message的next为空null，flags标记清零,sPoolSize减1，返回我们需要的Message. 如果sPools为空的话直接new一个Message.</li><li>虽然sPool看上去像一个消息池，但其实是一个Message对象,每一个Message 对象通过next指向下一个Message（最后一个Message的next为null)形成一个链表，Message对象就成了一个可用的Message池。</li><li>Message对象是什么时候放入链表中的呢？从obtain函数并没有看见存储Message的操作，其实它是在Handler讲解里面提到的调用了recycle 回收的时候放入池子中的。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// frameworks/base/core/java/android/os/Message.java</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">recycle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/// 首先检查是否正在使用</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isInUse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>gCheckRecycle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;This message cannot be recycled because it &quot;</span>
                    <span class="token operator">+</span> <span class="token string">&quot;is still in use.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">recycleUnchecked</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">recycleUnchecked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 清空Message</span>
    flags <span class="token operator">=</span> <span class="token constant">FLAG_IN_USE</span><span class="token punctuation">;</span>
    what <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    arg1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    arg2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    obj <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    replyTo <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    sendingUid <span class="token operator">=</span> <span class="token constant">UID_NONE</span><span class="token punctuation">;</span>
    workSourceUid <span class="token operator">=</span> <span class="token constant">UID_NONE</span><span class="token punctuation">;</span>
    when <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    target <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    callback <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    data <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// 同步锁</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>sPoolSync<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果池子里已有的Message对象数量小于定义的池子最大值,放入链表的开头</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>sPoolSize <span class="token operator">&lt;</span> <span class="token constant">MAX_POOL_SIZE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            next <span class="token operator">=</span> sPool<span class="token punctuation">;</span>
            sPool <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
            sPoolSize<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27);function w(y,h){const a=i("font");return p(),t("div",null,[d,v,m,n("ul",null,[b,n("li",null,[s("Handler 在初始化的时候也会初始化mLooper 以及 mQueue,mQueue就是存储在mLooper中的消息队列。我们可以不传入looper参数去new 一个Handler ，因为它会在构造函数中调用"),o(a,{color:"#0099ff"},{default:c(()=>[s(" Looper.myLooper() ")]),_:1}),s("自动去获取当前线程的looper，目前高版本的SDK中这种不传入looper的方法已经Deprecated了，所以推荐在使用的时候手动传入一个looper。")])]),g])}const M=e(r,[["render",w],["__file","4.html.vue"]]);export{M as default};
