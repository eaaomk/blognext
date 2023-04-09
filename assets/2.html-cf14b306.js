import{_ as a,V as n,W as s,Z as e}from"./framework-bcbeea85.js";const t={},i=e(`<h1 id="图像" tabindex="-1"><a class="header-anchor" href="#图像" aria-hidden="true">#</a> 图像</h1><h2 id="imageview" tabindex="-1"><a class="header-anchor" href="#imageview" aria-hidden="true">#</a> ImageView</h2><p>ImageView是图像显示控件，与图形显示有关的属性说明如下：</p><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>
scaleType：指定图形的拉伸类型，默认是fitCenter。拉伸类型的取值说明下面会给出一张表作为参考。
src：指定图形来源，src图形按照scaleType拉伸。注意背景图不按scaleType指定的方式拉伸，背景默认以fitXY方式拉伸。

setScaleType：设置图形的拉伸类型。具体的取值说明下面会给出一张表作为参考。
setImageDrawable：设置图形的Drawable对象。
setImageResource：设置图形的资源ID。
setImageBitmap：设置图形的位图对象。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>缩放类型</th><th>效果</th></tr></thead><tbody><tr><td>CENTER</td><td>保持原始的尺寸，并在视图居中</td></tr><tr><td>FIT_CENTER</td><td>保持宽高比例，缩放图片使其位于视图中间</td></tr><tr><td>CENTER_CROP</td><td>缩放图片使其充满视图，并位于视图中间</td></tr><tr><td>CENTER_INSIDE</td><td>保持宽高比例，缩小图片使之位于视图中间（只缩小不放大）</td></tr><tr><td>FIT_XY</td><td>缩放图片使其正好填满视图（图片可能被缩放变形）</td></tr><tr><td>FIT_START</td><td>保持宽高比例，缩放图片使其位于视图上方或左侧</td></tr><tr><td>FIT_END</td><td>保持宽高比例，缩放图片使其位于视图下方或右侧</td></tr></tbody></table><h2 id="截图功能" tabindex="-1"><a class="header-anchor" href="#截图功能" aria-hidden="true">#</a> 截图功能</h2><p>Android能用ImageView展示图片，也自带屏幕截图功能。尽管自带的屏蔽截图功能有些简单，不过多数场合已经够用了。 因为截图功能面向所有视图，所以可以从其他控件或布局那里截图下来，然后显示在ImageView上面。 相关方法解释如下：</p><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>setDrawingCacheEnabled：设置绘图缓存的可用状态。true表示打开，false表示关闭。
isDrawingCacheEnabled：判断该控件的绘图缓存是否可用。
setDrawingCacheQuality：设置绘图缓存的质量。
getDrawingCache：获取该控件的绘图缓存结果，返回值为Bitmap类型。
setDrawingCacheBackgroundColor：设置绘图缓存的背景颜色。大家可能会奇怪为何要提供该方法，因为绘图缓存默认背景色是黑色，如果不提前设置缓存的背景色，截图的结果就是黑乎乎一片，所以需要将背景色设置为默认颜色（通常是白色）。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>截图步骤如下：</p><ol><li><p>开始截图前，先调用setDrawingCacheEnabled方法，设置绘图缓存为可用状态。注意该方法在一开始就得调用，因为先开启绘图缓存，之后变更的界面才会记录到缓存中；如果先变更界面再开启绘图缓存，缓存里就是空的。</p></li><li><p>调用getDrawingCache方法获取缓存中的图像数据。</p></li><li><p>完成截图，延迟若干毫秒后调用setDrawingCacheEnabled方法关闭绘图缓存。如果接下来还要截图，就再次调用setDrawingCacheEnabled方法重新开启绘图缓存。</p></li></ol><p>代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">TextView</span> textView <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TextView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ImageView</span> imageView <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ImageView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
textView<span class="token punctuation">.</span><span class="token function">setDrawingCacheEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Bitmap</span> bitmap <span class="token operator">=</span> textView<span class="token punctuation">.</span><span class="token function">getDrawingCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
imageView<span class="token punctuation">.</span><span class="token function">setImageBitmap</span><span class="token punctuation">(</span>bitmap<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Handler</span> handler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Handler</span><span class="token punctuation">(</span><span class="token class-name">Looper</span><span class="token punctuation">.</span><span class="token function">getMainLooper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 延迟关闭，不然会抛出异常，绘制需要时间</span>
handler<span class="token punctuation">.</span><span class="token function">postDelayed</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        textView<span class="token punctuation">.</span><span class="token function">setDrawingCacheEnabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="imagebutton-button" tabindex="-1"><a class="header-anchor" href="#imagebutton-button" aria-hidden="true">#</a> ImageButton &amp; Button</h2><p>ImageButton其实派生自ImageView，而不是派生自Button，ImageView拥有的属性和方法，ImageButton统统拥有，只是ImageButton有个默认的按钮外观。</p><p>Button派生自TextView，二者在UI上的区别主要是Button控件有个按钮外观，提示用户点击这里。系统默认的按钮外观通常都不好看，需要更换靓一点、活泼一点的图片，这时在布局文件中修改Button节点的background属性就可以了。如果把background属性设置为@null，就会去除Button控件的背景样式，此时的Button看起来跟TextView没什么区别。</p><p>ImageButton和Button都起到控制按钮的作用，不同的是Button是文本按钮，ImageButton是图像按钮，这两个按钮的主要区别在于：</p><p>（1）Button既可显示文本也可显示图形（通过设置背景图），而ImageButton只能显示图形不能显示文本。</p><p>（2）ImageButton上的图像可按比例拉伸，而Button上的大图会拉伸变形（因为背景图无法按比例拉伸）。</p><p>（3）Button只能在背景显示一张图形，而ImageButton可分别在前景和背景显示两张图形，实现图片叠加的效果。从上面可以看出，Button与ImageButton各有千秋，通常情况下使用Button就够用了。但在某些场合，比如输入法打不出来的字符和以特殊字体显示的字符串，就适合先切图再用ImageButton显示。</p><ul><li>tip:要想在文字周围放置图片，使用TextView就能实现，那么基于TextView的Button自然能实现。 具体可在XML布局文件中设置以下5个属性。</li></ul><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>drawableTop：指定文本上方的图形。
drawableBottom：指定文本下方的图形。
drawableLeft：指定文本左边的图形。
drawableRight：指定文本右边的图形。
drawablePadding：指定图形与文本的间距。若在代码中实现，则可调用如下方法。
 ## 代码定义
setCompoundDrawables：设置文本周围的图形。可分别设置左边、上边、右边、下边的图形。
setCompoundDrawablePadding：设置图形与文本的间距。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图形drawable" tabindex="-1"><a class="header-anchor" href="#图形drawable" aria-hidden="true">#</a> 图形Drawable</h2><p>Android把所有显示出来的图形都抽象为Drawable（可绘制的）。 这里的图形不止是图片，还包括色块、画板、背景等。drawable文件放在res目录的各个drawable目录下。\\res\\drawable一般存放的是描述性的XML文件，图片文件一般放在具体分辨率的drawable目录下。例如：</p><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>drawable-ldpi里面存放低分辨率的图片（如240×320），现在基本没有这样的智能手机了。
drawable-mdpi里面存放中等分辨率的图片（如320×480），这样的智能手机已经很少了。
drawable-hdpi里面存放高分辨率的图片（如480×800），一般对应4英寸～4.5英寸的手机（但不绝对，同尺寸的手机有可能分辨率不同，手机分辨率就高不就低，因为分辨率低了屏幕会有模糊的感觉）。
drawable-xhdpi里面存放加高分辨率的图片（如720×1280），一般对应5英寸～5.5英寸的手机。
drawable-xxhdpi里面存放超高分辨率的图片（如1080×1920），一般对应6英寸～6.5英寸的手机。
drawable-xxxhdpi里面存放超超高分辨率的图片（如1440×2560），一般对应7英寸以上的平板电脑。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>tip:拿到一张图片，可以直接复制粘贴到drawable目录，也可以通过批量drawable插件Android Postfix Completion生成并导入各分辨率的图片</li></ul><h3 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h3><p>在XML布局文件中引用drawable文件可使用“@drawable/***” 这种形式，如background属性、ImageView和ImageButton的src属性、TextView和Button的drawableTop系列属性都可以引用drawable文件。</p><p>在代码中引用drawable文件可分为两种情况：</p><p>(1)使用setBackgroundResource和setImageResource方法，可直接在参数中指定drawable文件的资源ID，例如“R.drawable.***”。</p><p>(2)使用setBackgroundDrawable、setImageDrawable和setCompoundDrawables等方法，参数是Drawable对象，这时得先从资源文件中生成Drawable对象</p><h2 id="状态列表图形" tabindex="-1"><a class="header-anchor" href="#状态列表图形" aria-hidden="true">#</a> 状态列表图形</h2><p>一般drawable是静态图形，如Button按钮的背景在正常情况下是凸起的，在按下时是凹陷的，从按下到弹起的过程，用户便能知道点击了这个按钮。</p><p>根据不同的触摸情况变更图形显示，这种情况会用到Drawable的一个子类StateListDrawable，该子类在XML文件中定义不同状态时呈现图形列表。</p><p>示例如下：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>
<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>selector</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!--是否按下--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item</span> <span class="token attr-name"><span class="token namespace">android:</span>state_pressed</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">android:</span>drawable</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@drawable/button_pressed<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item</span> <span class="token attr-name"><span class="token namespace">android:</span>state_pressed</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">android:</span>drawable</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@drawable/button_normal<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!--是否获取焦点--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item</span> <span class="token attr-name"><span class="token namespace">android:</span>state_focused</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!--是否勾选--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item</span> <span class="token attr-name"><span class="token namespace">android:</span>state_checked</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!--是否选中--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item</span> <span class="token attr-name"><span class="token namespace">android:</span>state_selected</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>selector</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="形状图形" tabindex="-1"><a class="header-anchor" href="#形状图形" aria-hidden="true">#</a> 形状图形</h2><p>形状图形的定义文件以shape元素为根节点。根节点下定义了6个节点：corners（圆角）、gradient（渐变）、padding（间隔）、size（尺寸）、solid（填充）、stroke（描边），各节点的属性值主要是长宽、半径、角度以及颜色。下面是形状图形各个节点和属性的简要说明。</p><ol><li>shapeshape是XML文件的根节点，用来描述该形状图形是哪种几何图形。下面是shape节点的常用属性说明。</li></ol><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>shape：字符串类型，图形的形状。拥有的属性：

rectangle(矩形,默认值)、oval(椭圆，此时corners 会失效)、line(直线，必须设置stroke)、ring(圆环)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>cornerscorners是shape的下级节点，用来描述4个圆角的规格定义。若无corners节点，则表示没有圆角。下面是corners节点的常用属性说明。</li></ol><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>bottomLeftRadius：像素类型，左下圆角的半径。
bottomRightRadius：像素类型，右下圆角的半径。
topLeftRadius：像素类型，左上圆角的半径。
topRightRadius：像素类型，右上圆角的半径。
radius：像素类型，圆角半径（若有上面4个圆角半径的定义，则不需要radius定义）。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>gradientgradient是shape的下级节点，用来描述形状内部的颜色渐变定义。若无gradient节点，则表示没有渐变效果。下面是gradient节点的常用属性说明。</li></ol><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>angle：整型，渐变的起始角度。为0时表示时钟的9点位置，值增大表示往逆时针方向旋转。例如，值为90表示6点位置，值为180表示3点位置，值为270表示0点／12点位置。
centerX：浮点型，圆心的X坐标。当android:type=&quot;linear&quot;时不可用。
centerY：浮点型，圆心的Y坐标。当android:type=&quot;linear&quot;时不可用。
gradientRadius：整型，渐变的半径。当android:type=&quot;radial&quot;时才需要设置该属性。
centerColor：颜色类型，渐变的中间颜色。
startColor：颜色类型，渐变的起始颜色。
endColor：颜色类型，渐变的终止颜色。
useLevel：布尔类型，设置为true无渐变色、false有渐变色。

type：字符串类型，渐变类型。渐变类型的取值有以下几个：

linear (线性渐变，默认值), radial(放射渐变，起始颜色就是圆心的颜色)， sweep(滚动渐变，即一个线段以某个端点为圆心做360度旋转)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>paddingpadding是shape的下级节点，用来描述形状图形与周围视图的间隔大小。若无padding节点，则表示四周不设间隔。下面是padding节点的常用属性说明。</li></ol><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>bottom：像素类型，与下边的间隔。
left：像素类型，与左边的间隔。
right：像素类型，与右边的间隔。
top：像素类型，与上边的间隔。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>sizesize是shape的下级节点，用来描述形状图形的尺寸大小（宽度和高度）。若无size节点，则表示宽高自适应。下面是size节点的常用属性说明。</li></ol><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>height：像素类型，图形高度。width：像素类型，图形宽度。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6"><li>solidsolid是shape的下级节点，用来描述形状图形内部的填充色彩。若无solid节点，则表示无填充颜色。下面是solid节点的常用属性说明。</li></ol><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>color：颜色类型，内部填充的颜色。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="7"><li>strokestroke是shape的下级节点，用来描述形状图形四周边线的规格定义。若无stroke节点，则表示不存在描边。下面是stroke节点的常用属性说明。</li></ol><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>color：颜色类型，描边的颜色。
dashGap：像素类型，每段虚线之间的间隔。
dashWidth：像素类型，每段虚线的宽度。
width：像素类型，描边的厚度。若dashGap和dashWidth有一个值为0，则描边为实线。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>tip: 水平分割线直接使用view，然后设置高度为1dp,宽度匹配父级容器即可</li></ul><h2 id="_9-图片" tabindex="-1"><a class="header-anchor" href="#_9-图片" aria-hidden="true">#</a> .9 图片</h2><p>点九图片的扩展名是png，文件名后常带有“.9”字样。因为把一张图片划分成了3×3的九宫格区域，所以得名点九图片，也叫九宫格图片。如果背景是一个shape图形，其stroke节点的width属性已经设置了具体的像素值（如1dp），那么无论该shape图形被拉伸到多大，描边宽度始终都是1dp。</p><p>点九图片的实现原理与shape类似，即拉伸图形时，只对内部进行拉伸，不对边缘做拉伸操作。</p><p>用android studio 进行选定指定区域拉伸，以及指定区域设置padding 即可。</p>`,56),l=[i];function p(d,o){return n(),s("div",null,l)}const u=a(t,[["render",p],["__file","2.html.vue"]]);export{u as default};
