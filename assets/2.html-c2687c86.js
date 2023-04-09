import{_ as e,V as t,W as p,X as n,Y as a,$ as i,Z as l,F as o}from"./framework-bcbeea85.js";const c={},u=l(`<h1 id="android-开发基础" tabindex="-1"><a class="header-anchor" href="#android-开发基础" aria-hidden="true">#</a> Android 开发基础</h1><h3 id="app的运行环境" tabindex="-1"><a class="header-anchor" href="#app的运行环境" aria-hidden="true">#</a> App的运行环境</h3><p>App是在手机上运行的一类应用软件，Android 系统基于Linux内核，但不等同与Linux 系统，是无法直接运行在Linux系统上的 我们可以运用模拟器或者真机进行App的调试与开发，真机需要在开发者模式中打开USB调试，模拟器则是直接运行在电脑上的， 模拟器很占用电脑的内存，并且没有真机的一些功能。</p><h3 id="app的开发语言" tabindex="-1"><a class="header-anchor" href="#app的开发语言" aria-hidden="true">#</a> App的开发语言</h3><p>基于Android 系统的App开发主要有两大技术栈，一个是原生开发，另外一个就是混合开发。 原生开发指的是在移动平台上利用官方提供的编程语言，比如Java Kotlin,开发工具包（SDK），开发环境进行App 开发。 混合开发指的是结合原生技术和H5技术开发的混合应用，也就是将App的页面改成内嵌的网页，无需升级App，只需要覆盖服务器上的网页，即可动态更新App页面。 混合开发本质上是依赖于原生开发的。</p><p>其中Java和Kotlin 都属于解释型语言（对于此处有一定争论，实际上新的JVM 中对于部分高频方法会进行‘提前’编译），它们都基于JVM（java virtual machine），这类语言在运行的时候才会将程序翻译成机器语言，故而执行效率偏低， 涉及到图像与音视频处理等复杂预算的场合，依然首选考虑编译型语言C/C++，借助于JNI（java native interface），Java 原生接口， 即native 方法，Java代码可以调用C/C++编写的代码。</p><p>XML 全称 Exteensible Markup Language,可扩展标记语言，它并非编程语言，类似于HTML，利用各种标签表达页面元素，以及各个元素的排列组合和层级关系，内部的标签都以‘android:’字样开头，表示这是标准的android属性。</p><p>内部还拥有其他语言，比如makefile等。</p><h3 id="app连接的数据库" tabindex="-1"><a class="header-anchor" href="#app连接的数据库" aria-hidden="true">#</a> App连接的数据库</h3><p>Android 系统没有其他的企业级数据库，比如MySQL,Oracle,它内置的是SQLite数据库，它内嵌到应用进程当中，无需配置连接信息，就可以对其进行增删改查，所以SQLite也被归类为嵌入式数据库。</p><h3 id="app的工程结构" tabindex="-1"><a class="header-anchor" href="#app的工程结构" aria-hidden="true">#</a> App的工程结构</h3><p>App工程分为项目与模块，Module，一般运行某个app，我们运行的是某个Module，以下对目录的结构进行一些解释</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>app
    <span class="token operator">--</span>manifests  <span class="token class-name">App</span>的运行配置文件
    <span class="token operator">--</span>java  <span class="token class-name">Java</span>源码
    <span class="token operator">--</span>res 当前模块的资源文件
        <span class="token operator">--</span>drawable 存放图形描述文件与图片文件
        <span class="token operator">--</span>layout 存放<span class="token class-name">App</span>页面的布局文件
        <span class="token operator">--</span>mipmap 存放<span class="token class-name">App</span>的启动图标
        <span class="token operator">--</span>values 存放常量定义文件，例如字符串常量，像素常量，颜色常量，样式风格定义
gradle  主要是工程的编译配置文件
    <span class="token operator">--</span> build<span class="token punctuation">.</span>gralde 改文件分为项目级与模块级，用于描述<span class="token class-name">App</span>工程的编译规则
    <span class="token operator">--</span> proguard<span class="token operator">-</span>rules<span class="token punctuation">.</span>pro java 代码的混淆规则
    <span class="token operator">--</span> gralde<span class="token punctuation">.</span>properties 改文件配置编译工程的命令行参数
    <span class="token operator">--</span> setting<span class="token punctuation">.</span>gradle 配置编译哪些模块<span class="token punctuation">,</span>初始内容为‘include <span class="token char">&#39;：app&#39;</span>’ 表示只编译app的模块
    <span class="token operator">--</span> local<span class="token punctuation">.</span>properties 用于描述开发者计算机的环境配置，包括<span class="token constant">SDK</span>的本地路径、<span class="token constant">NDK</span>的本地路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="build-gralde-配置文件" tabindex="-1"><a class="header-anchor" href="#build-gralde-配置文件" aria-hidden="true">#</a> build.gralde 配置文件</h3><p>project 级别</p><div class="language-gradle line-numbers-mode" data-ext="gradle"><pre class="language-gradle"><code>
buildscript <span class="token punctuation">{</span>
    <span class="token keyword">dependencies</span> <span class="token punctuation">{</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:4.2.2&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">plugins</span> <span class="token punctuation">{</span>
    id <span class="token string">&#39;com.android.application&#39;</span> version <span class="token string">&#39;7.1.2&#39;</span> <span class="token keyword">apply</span> <span class="token boolean">false</span>
    id <span class="token string">&#39;com.android.library&#39;</span> version <span class="token string">&#39;7.1.2&#39;</span> <span class="token keyword">apply</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

task <span class="token function">clean</span><span class="token punctuation">(</span>type<span class="token punctuation">:</span> Delete<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    delete rootProject<span class="token punctuation">.</span>buildDir
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>moudle 级别</p><div class="language-gradle line-numbers-mode" data-ext="gradle"><pre class="language-gradle"><code><span class="token keyword">plugins</span> <span class="token punctuation">{</span>
    id <span class="token string">&#39;com.android.application&#39;</span>
<span class="token punctuation">}</span>

android <span class="token punctuation">{</span>
    <span class="token comment">// 指定编译用的SDK版本号。比如31表示使用Android 12编译</span>
    compileSdk <span class="token number">31</span>

    defaultConfig <span class="token punctuation">{</span>
        <span class="token comment">// 指定该模块的应用编号，也就是App的包名</span>
        applicationId <span class="token interpolation-string"><span class="token string">&quot;com.example.xxxxx&quot;</span></span>
        <span class="token comment">// 指定App适合运行的最小SDK版本号。比如21表示至少要在Android 5.0上运行</span>
        minSdk <span class="token number">21</span>
        <span class="token comment">// 指定目标设备的SDK版本号。表示App最希望在哪个版本的Android上运行</span>
        targetSdk <span class="token number">31</span>
        <span class="token comment">// 指定App的应用版本号</span>
        versionCode <span class="token number">1</span>
        <span class="token comment">// 指定App的应用版本名称</span>
        versionName <span class="token interpolation-string"><span class="token string">&quot;1.0&quot;</span></span>

        testInstrumentationRunner <span class="token interpolation-string"><span class="token string">&quot;androidx.test.runner.AndroidJUnitRunner&quot;</span></span>
    <span class="token punctuation">}</span>

    buildTypes <span class="token punctuation">{</span>
        release <span class="token punctuation">{</span>
            minifyEnabled <span class="token boolean">false</span>
            proguardFiles <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string">&#39;proguard-android-optimize.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;proguard-rules.pro&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 指定App编译的依赖信息</span>
<span class="token keyword">dependencies</span> <span class="token punctuation">{</span>
    <span class="token comment">// 指定引用jar包的路径</span>
    <span class="token keyword">implementation</span> <span class="token function">fileTree</span><span class="token punctuation">(</span>dir<span class="token punctuation">:</span> <span class="token string">&#39;libs&#39;</span><span class="token punctuation">,</span> include<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;*.jar&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment">// 指定编译Android的高版本支持库。如AppCompatActivity必须指定编译appcompat库</span>
    <span class="token comment">//appcompat库各版本见 https://mvnrepository.com/artifact/androidx.appcompat/appcompat</span>
    <span class="token keyword">implementation</span> <span class="token string">&#39;androidx.appcompat:appcompat:1.4.1&#39;</span>
    <span class="token comment">// 指定单元测试编译用的junit版本号</span>
    testImplementation <span class="token string">&#39;junit:junit:4.13.2&#39;</span>
    androidTestImplementation <span class="token string">&#39;androidx.test.ext:junit:1.1.3&#39;</span>
    androidTestImplementation <span class="token string">&#39;androidx.test.espresso:espresso-core:3.4.0&#39;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="settings-gradle" tabindex="-1"><a class="header-anchor" href="#settings-gradle" aria-hidden="true">#</a> settings.gradle</h3><div class="language-gradle line-numbers-mode" data-ext="gradle"><pre class="language-gradle"><code>pluginManagement <span class="token punctuation">{</span>
    <span class="token keyword">repositories</span> <span class="token punctuation">{</span>
        <span class="token function">gradlePluginPortal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 以下四行添加阿里云的仓库地址，方便国内开发者下载相关插件</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/jcenter&#39;</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/google&#39;</span><span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin&#39;</span><span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public&#39;</span><span class="token punctuation">}</span>
        <span class="token comment">// 以下添加华为的仓库地址，引入HMS需要</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://developer.huawei.com/repo/&#39;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
dependencyResolutionManagement <span class="token punctuation">{</span>
    repositoriesMode<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>RepositoriesMode<span class="token punctuation">.</span>FAIL_ON_PROJECT_REPOS<span class="token punctuation">)</span>
    <span class="token keyword">repositories</span> <span class="token punctuation">{</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 以下四行添加阿里云的仓库地址，方便国内开发者下载相关插件</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/jcenter&#39;</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/google&#39;</span><span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin&#39;</span><span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public&#39;</span><span class="token punctuation">}</span>
        <span class="token comment">// 以下添加华为的仓库地址，引入HMS需要</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://developer.huawei.com/repo/&#39;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
rootProject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;android&quot;</span></span>
include <span class="token string">&#39;:app&#39;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="androidmanifest-xml" tabindex="-1"><a class="header-anchor" href="#androidmanifest-xml" aria-hidden="true">#</a> AndroidManifest.xml</h3><p>以下是一些比较基础的示例</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>manifest</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.example.chapter02<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>application</span>
        <span class="token attr-name"><span class="token namespace">android:</span>allowBackup</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">&lt;!--</span>    <span class="token attr-name">是否允许应用备份--</span><span class="token punctuation">&gt;</span></span>
        android:icon=&quot;@mipmap/ic_launcher&quot;
    <span class="token comment">&lt;!--    指定App在手机屏幕上上显示的图标--&gt;</span>
        android:label=&quot;@string/app_name&quot;
    <span class="token comment">&lt;!--    指定App在手机屏幕上上显示的名称--&gt;</span>
        android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
    <span class="token comment">&lt;!--    指定App在手机屏幕上上显示的圆角图标--&gt;</span>
    android:supportsRtl=&quot;true&quot;
    <span class="token comment">&lt;!--    是否支持阿拉伯语、波斯语这种从右往左的文字排列顺序--&gt;</span>
    android:theme=&quot;@style/AppTheme&quot;&gt;
    <span class="token comment">&lt;!--    App的显示风格--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activity</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>.Main2Activity<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activity</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- activity节点指定了该App拥有的活动页面信息，其中拥有android.intent.action.MAIN的activity说明它是入口页面 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activity</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>.MainActivity<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">android:</span>exported</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>intent-filter</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>action</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>android.intent.action.MAIN<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>category</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>android.intent.category.LAUNCHER<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>intent-filter</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activity</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>application</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>manifest</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="app的设计规范" tabindex="-1"><a class="header-anchor" href="#app的设计规范" aria-hidden="true">#</a> App的设计规范</h3><p>App 将看得见的界面设计与看不见的代码逻辑分开，XML用来描绘应用界面，Java代码书写程序逻辑，进而生成App前后端分离的设计规约，有利于提高App集成的灵活性</p><p>使用XML的优点：</p><ol><li>方便查看预览效果</li><li>一个布局可以被多处代码使用</li><li>一段代码可以适配多个界面布局，比如手机的横屏和竖屏</li></ol><p>注意的地方： res/layout 放置默认的竖屏风格 res/layout-land 放回横屏的xml 文件，值得注意的是它们xml文件需要取一样的名字</p><p>XML 文件包含根节点、布局节点、控件节点：</p>`,29),d=n("li",null,"每个界面只有一个根节点，可以有多个布局节点，也可以没有",-1),r={href:"http://schemas.android.com/apk/res/android",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,"App 新的页面需要三个步骤：创建XML 文件、创建Java 代码、 在AndroidManifest.xml 中注册页面配置",-1);function m(k,b){const s=o("ExternalLinkIcon");return t(),p("div",null,[u,n("ol",null,[d,n("li",null,[a('根节点需要指定XML内部的命名空间 ‘xmlns:android="'),n("a",r,[a("http://schemas.android.com/apk/res/android"),i(s)]),a('"’')])]),v])}const h=e(c,[["render",m],["__file","2.html.vue"]]);export{h as default};
