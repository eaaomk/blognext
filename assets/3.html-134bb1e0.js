import{_ as n,V as a,W as s,Z as t}from"./framework-bcbeea85.js";const e={},p=t(`<h1 id="android-简单控件" tabindex="-1"><a class="header-anchor" href="#android-简单控件" aria-hidden="true">#</a> Android 简单控件</h1><h3 id="文本控件" tabindex="-1"><a class="header-anchor" href="#文本控件" aria-hidden="true">#</a> 文本控件</h3><p>1.文本定义</p><p>不推荐在XML 文件中直接写字符串，应该使用来自@string的字符串，将字符串定义在专用的位置下：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>// res/values/strings.xml
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app_name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>app name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hello<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>你好，世界<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.文本的大小</p><p>常见的字号单位主要有px、dp、sp</p><ul><li><p>px px是手机屏幕的最小显示单位，像素密度越高，以px计量的分辨率就越大</p></li><li><p>dp 有时也写作dip，与设备无关的显示单位，只与屏幕的尺寸有关，同样尺寸的屏幕以dp计量的分辨率是相同的</p></li><li><p>sp 原理和dp 类似，但它专用来设置字体的大小，也是官方推荐的字号单位，设置普通字体，dp与sp 无任何差别，设置大字体，sp将会比dp 大，dp没有任何变化</p></li></ul><p>3.文本颜色</p><p>文本颜色或者背景分别引用于@color @drable，均在res/路径下定义</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>color</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>colorPrimary<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>#6200EE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>color</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>color</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>colorPrimaryDark<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>#3700B3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>color</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>color</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>colorAccent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>#03DAC5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>color</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>xml无法直接引用color类的颜色常量，所以在android中有一套规范的编码标准，色值由透明度和RGB三原色联合定义 该标准又分为6位十六进制和8位16进制两种表达方式 在8位16进制中：FFEEDDCC FF 代表透明度，表示完全不透明，如果是00就代表全透明，EE表示红色，DD 表示绿色的浓度，CC表示蓝色的浓度 在6位16进制中：0x00ff00 它在XML文件中默认不透明，在代码中默认透明</p><h3 id="视图基础" tabindex="-1"><a class="header-anchor" href="#视图基础" aria-hidden="true">#</a> 视图基础</h3><h4 id="视图属性" tabindex="-1"><a class="header-anchor" href="#视图属性" aria-hidden="true">#</a> 视图属性</h4><p>分为宽高，对应属性的是layout_width layout_height 1.match_parent 表示与上级视图保持一致 2.wrap_parent 表示与内容自适应 3.以dp为单位的具体尺寸 在代码中修改宽高属性：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 获取名叫tv_code的文本视图</span>
<span class="token class-name">TextView</span> tv_code <span class="token operator">=</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>tv_code<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 获取tv_code的布局参数（含宽度和高度）</span>
<span class="token class-name">ViewGroup<span class="token punctuation">.</span>LayoutParams</span> params <span class="token operator">=</span> tv_code<span class="token punctuation">.</span><span class="token function">getLayoutParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 修改布局参数中的宽度数值，注意默认px单位，需要把dp数值转成px数值</span>
params<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token class-name">Utils</span><span class="token punctuation">.</span><span class="token function">dip2px</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
tv_code<span class="token punctuation">.</span><span class="token function">setLayoutParams</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 设置tv_code的布局参数</span>


<span class="token comment">//Utils.java </span>
 <span class="token comment">// 根据手机的分辨率从 dp 的单位 转成为 px(像素)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">dip2px</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token keyword">float</span> dpValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取当前手机的像素密度（1个dp对应几个px）</span>
        <span class="token keyword">float</span> scale <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDisplayMetrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>density<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>dpValue <span class="token operator">*</span> scale <span class="token operator">+</span> <span class="token number">0.5f</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 四舍五入取整</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 根据手机的分辨率从 px(像素) 的单位 转成为 dp</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">px2dip</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token keyword">float</span> pxValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取当前手机的像素密度（1个dp对应几个px）</span>
        <span class="token keyword">float</span> scale <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDisplayMetrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>density<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>pxValue <span class="token operator">/</span> scale <span class="token operator">+</span> <span class="token number">0.5f</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 四舍五入取整</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="视图中的间距" tabindex="-1"><a class="header-anchor" href="#视图中的间距" aria-hidden="true">#</a> 视图中的间距</h4><p>与web 前端一样，有外边距，也有内边距，layout_margin,layout_padding，上下左右也可以单独设置</p><h4 id="视图的对齐方式" tabindex="-1"><a class="header-anchor" href="#视图的对齐方式" aria-hidden="true">#</a> 视图的对齐方式</h4><p>layout_gravity 可以指定当前视图相对于上级视图的对齐方向，下面举个例子</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>layout_gravity =&quot;top|left&quot;  // 左上
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>gravity 是指定内部内容的组件也就是下级视图的对齐方向，用法一样</p><h3 id="线性布局-相对布局" tabindex="-1"><a class="header-anchor" href="#线性布局-相对布局" aria-hidden="true">#</a> 线性布局 &amp; 相对布局</h3><p>LinearLayout 线性布局顾名思义，按照线性的分布进行布局，比较重要的属性有：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>orientation=&quot;horizontal&quot; // 指定下级布局的排列方向为横排，也可以设置为竖排

layout_weight=&quot;1&quot; // 权重，指定当前布局在上级布局中所占比的权重，按照这个权重值进行划分在布局中的位置

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>RelativeLayout 相对布局顾名思义，好比物理当中学的参考对象，我们站在本地不动，把地球作为参考对象，我们是处于不动的状态，把月球作为参考对象，实际上我们还是在动的</p><p>被包含在相对布局的第一级组件，有一系列的相对上级布局的属性，上下左右，居中、居顶部、居底部等均拥有,英文意思非常好理解，直译即可</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>  在垂直中间
  android:layout_centerVertical=&quot;true&quot; 

  跟上级左边对齐
   android:layout_alignParentLeft=&quot;true&quot;

   ···还有很多，就不举列子了
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="网格布局-滚动视图" tabindex="-1"><a class="header-anchor" href="#网格布局-滚动视图" aria-hidden="true">#</a> 网格布局 &amp; 滚动视图</h3><p>GridLayout 网格布局，就是跟网格一样</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>android:columnCount=&quot;2&quot;  // 几列
android:rowCount=&quot;2&quot;  // 几行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>滚动视图：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>//ScrollView 垂直方向滚动
android:layout_width=&quot;match_parent&quot;
android:layout_height=&quot;wrap_content&quot;
//HorizontalScrollView 水平方向滚动
android:layout_width=&quot;wrap_content&quot;
android:layout_height=&quot;200dp&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="按钮触控" tabindex="-1"><a class="header-anchor" href="#按钮触控" aria-hidden="true">#</a> 按钮触控</h3><p>Button</p><p>可以设置指定位置的图片：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>android:drawableLeft=&quot;@drawable/ic_about&quot;
android:drawableRight=&quot;@drawable/ic_about&quot;
android:drawableTop=&quot;@drawable/ic_about&quot;
android:drawableBottom=&quot;@drawable/ic_about&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本属性</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>
设置是否把字符转换成大写
android:textAllCaps=&quot;false&quot;

设置按钮是否能被点击
android:enabled=&quot;false&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token comment">// 从布局文件中获取名叫btn_click_single的按钮控件</span>
<span class="token class-name">Button</span> btn_click_single <span class="token operator">=</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>btn_click_single<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 设置点击监听器，一旦用户点击按钮，就触发监听器的onClick方法</span>
<span class="token comment">// 实现 View.OnClickListener 接口</span>
btn_click_single<span class="token punctuation">.</span><span class="token function">setOnClickListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyOnClickListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 设置长按监听器，一旦用户长按按钮，就触发监听器的onLongClick方法</span>

<span class="token comment">// 实现 View.OnLongClickListener 接口</span>
btn_longclick_single<span class="token punctuation">.</span><span class="token function">setOnLongClickListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyOnLongClickListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="图像视图-图像按钮" tabindex="-1"><a class="header-anchor" href="#图像视图-图像按钮" aria-hidden="true">#</a> 图像视图 &amp; 图像按钮</h3><p>ImageView 可以使用以下两种方式去设置图片的资源,scaleType 属性，当图片资源与空间大小不符合的时候，默认采取的缩放方式</p><table><thead><tr><th>缩放类型</th><th>效果</th></tr></thead><tbody><tr><td>CENTER</td><td>保持原始的尺寸，并在视图居中</td></tr><tr><td>FIT_CENTER</td><td>保持宽高比例，缩放图片使其位于视图中间</td></tr><tr><td>CENTER_CROP</td><td>缩放图片使其充满视图，并位于视图中间</td></tr><tr><td>CENTER_INSIDE</td><td>保持宽高比例，缩小图片使之位于视图中间（只缩小不放大）</td></tr><tr><td>FIT_XY</td><td>缩放图片使其正好填满视图（图片可能被缩放变形）</td></tr><tr><td>FIT_START</td><td>保持宽高比例，缩放图片使其位于视图上方或左侧</td></tr><tr><td>FIT_END</td><td>保持宽高比例，缩放图片使其位于视图下方或右侧</td></tr></tbody></table><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
iv_scale<span class="token punctuation">.</span><span class="token function">setImageResource</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>apple<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 设置缩放的方式</span>
iv_scale<span class="token punctuation">.</span><span class="token function">setScaleType</span><span class="token punctuation">(</span><span class="token class-name">ImageView<span class="token punctuation">.</span>ScaleType</span><span class="token punctuation">.</span><span class="token constant">CENTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code> android:src=&quot;@drawable/apple&quot;
 // 设置缩放的方式
 android:scaleType=&quot;center&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ImageButton</p><p>ImageButton 继承至ImageView，所以拥有所有ImageView 的方法与参数 它也拥有button的点击事件和长按事件，它们之间也包含一些差异：</p><ol><li>Button 既可以显示图片(通过setBackgroundResource)， 也可以显示文字，ImageButton 只能显示图片</li><li>ImageButton 图片可以按照比例缩放，Button通过设置背景的图像会拉伸变形</li><li>ImageButton 有前景图和背景图，Button 只有背景图</li></ol>`,48),l=[p];function o(c,i){return a(),s("div",null,l)}const d=n(e,[["render",o],["__file","3.html.vue"]]);export{d as default};