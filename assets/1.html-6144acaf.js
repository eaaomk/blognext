import{_ as p}from"./project-139cc1f9.js";import{_ as o,V as c,W as d,X as n,Y as a,$ as s,a0 as r,Z as i,F as t}from"./framework-bcbeea85.js";const u={},v=n("h1",{id:"基础环境",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#基础环境","aria-hidden":"true"},"#"),a(" 基础环境")],-1),m=n("h2",{id:"jdk",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#jdk","aria-hidden":"true"},"#"),a(" JDK")],-1),k=n("p",null,"JDK是Java语言的编译器，全称为Java Development Kit，即Java开发工具包。 因为Android应用采用Java语言开发，所以开发机上要先安装JDK，下载地址为：",-1),b={href:"http://www.oracle.com/technetwork/java/javase/downloads/index.html",target:"_blank",rel:"noopener noreferrer"},g=i('<p>JDK建议安装1.8及以上版本，原因是不同的Android版本对JDK有相应的要求，如Android 5.0默认使用jdk1.7编译，Android 7.0默认使用jdk1.8编译。</p><h2 id="sdk" tabindex="-1"><a class="header-anchor" href="#sdk" aria-hidden="true">#</a> SDK</h2><p>SDK是Android应用的编译器，全称为Software Development Kit，即软件开发工具包。SDK提供了App开发的常用工具合集，主要包括：build-tools目录，存放各版本Android的各种编译工具。docs目录，存放开发说明文档。</p><ul><li>extras\\android目录，存放兼容低版本的新功能支持库，比如android-support-v4.jar、v7的各种支持库、v13以上兼容库等。</li><li>platforms目录，存放各版本Android的资源文件。</li><li>platform-tools目录与tools目录，存放常用的开发辅助工具，如数据库管理工具sqlite3.exe、模拟器管理工具emulator.exe。</li><li>samples目录，存放各版本Android常用功能的demo源码。</li><li>sources目录，存放各版本Android的API开放接口源码。</li><li>system-images目录，存放模拟器各版本的系统镜像与管理工具。</li></ul><p>SDK可以单独安装，也可以与Android Studio一起安装，单独安装的下载页面入口地址是：</p>',5),h={href:"http://sdk.android-studio.org/",target:"_blank",rel:"noopener noreferrer"},q=i('<p>建议通过Android Studio安装SDK，因为这样避免了一些兼容性与环境设置问题。无论是单独安装还是一起安装，装好SDK后都要在环境变量的系统变量中添加ANDROID_HOME，取值为SDK的安装目录，例如D:\\Android\\sdk。并在系统变量Path末尾添加;%ANDROID_HOME%\\tools。</p><h2 id="ndk" tabindex="-1"><a class="header-anchor" href="#ndk" aria-hidden="true">#</a> NDK</h2><p>NDK是C/C++代码的编译器，全称为Native Development Kit，意即原生开发工具包。该工具包主要供JNI接口使用，先把C/C++代码编译成so库，然后由Java代码通过JNI接口调用so库。NDK的详细安装步骤后续单独写一篇文章阐述。装好NDK后，要在环境变量的系统变量中添加NDK_ROOT，取值为NDK的安装目录，例如D:\\Android\\android-ndk-r17。然后在系统变量Path末尾添加;%NDK_ROOT%。</p><h2 id="工程目录结构" tabindex="-1"><a class="header-anchor" href="#工程目录结构" aria-hidden="true">#</a> 工程目录结构</h2><figure><img src="'+p+`" alt="工程目录结构" tabindex="0" loading="lazy"><figcaption>工程目录结构</figcaption></figure><p>从结构图中可以看到，该工程下面有两个目录：一个是app，另一个是Gradle Scripts。其中，app下面又有3个子目录，功能说明如下：</p><p>（1）manifests子目录，下面只有一个xml文件，即AndroidManifest.xml，是App的运行配置文件。</p><p>（2）java子目录，下面有3个com.example.hellorworld包，其中第一个包存放的是App工程的java源代码，后面两个包存放的是测试用的Java代码。</p><p>（3）res子目录，存放的是App工程的资源文件。res子目录下又有4个子目录：drawable目录存放的是图形描述文件与用户图片。layout目录存放的是App页面的布局文件。mipmap目录存放的是启动图标。values目录存放的是一些常量定义文件，比如字符串常量strings.xml、像素常量dimens.xml、颜色常量colors.xml、样式风格定义styles.xml等。</p><h2 id="配置文件build-gradle" tabindex="-1"><a class="header-anchor" href="#配置文件build-gradle" aria-hidden="true">#</a> 配置文件build.gradle</h2><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>plugins {
    id &#39;com.android.application&#39;
}

android {
    namespace &#39;com.qiang.zhang.myapplication&#39;

    //指定编译用的SDK版本号，32就是 android S 12.0编译
    compileSdk 32

    defaultConfig {
        // 指定该模块的应用编号，即APP的包名。该参数为自动生成，无需修改
        applicationId &quot;com.qiang.zhang.myapplication&quot;
        // 指定App 适合运行的最小SDK 版本号。如29表示至少要在Android 10 上运行
        minSdk 29
        // 指定目标设备的SDK 版本号。即该APP最希望在哪个版本的Android 上运行
        targetSdk 29
        // 指定App的应用版本号
        versionCode 1
        // 指定App的应用版本名称
        versionName &quot;1.0&quot;

        testInstrumentationRunner &quot;androidx.test.runner.AndroidJUnitRunner&quot;
    }

    buildTypes {
        release {
            // 指定是否开启代码混淆功能，true表示开启混淆，false 表示无需混淆
            minifyEnabled false
            // 指定代码混淆规则文件的文件名
            proguardFiles getDefaultProguardFile(&#39;proguard-android-optimize.txt&#39;), &#39;proguard-rules.pro&#39;
        }
    }
    compileOptions {
        // 指定的JAVA 版本
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    buildFeatures {
        // 开启 viewBinding
        viewBinding true
    }
}

dependencies {

    // 指定引用jar的路径
    implementation fileTree(dir: &#39;libs&#39;,includes: [&#39;*.jar&#39;])

    implementation &#39;androidx.appcompat:appcompat:1.4.1&#39;
    implementation &#39;com.google.android.material:material:1.5.0&#39;
    // 指定单元测试编译用的Junit版本号
    testImplementation &#39;junit:junit:4.13.2&#39;
    androidTestImplementation &#39;androidx.test.ext:junit:1.1.3&#39;
    androidTestImplementation &#39;androidx.test.espresso:espresso-core:3.4.0&#39;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置settings-gradle" tabindex="-1"><a class="header-anchor" href="#配置settings-gradle" aria-hidden="true">#</a> 配置settings.gradle</h2><div class="language-gradle line-numbers-mode" data-ext="gradle"><pre class="language-gradle"><code>pluginManagement <span class="token punctuation">{</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置androidmanifest-xml" tabindex="-1"><a class="header-anchor" href="#配置androidmanifest-xml" aria-hidden="true">#</a> 配置AndroidManifest.xml</h2><p>AndroidManifest.xml用于指定App内部的运行配置，是一个XML描述文件，根节点为manifest，根节点的package指定了该App的包名。manifest下面又有若干子节点，分别说明如下：</p><p>（1）uses-sdk，该节点有两个属性：android:minSdkVersion和android:targetSdkVersion。这两个属性是早期Eclipse开发App时使用的，现在这两个字段改成放到build.gradle文件中，故而Android Studio不配置uses-sdk也没有关系。</p><p>（2）uses-permission，该节点用于声明App运行过程中需要的权限名称。例如，访问网络需要上网权限，拍照需要摄像头权限，定位需要定位权限等。</p><p>（3）application，该节点用于指定App的自身属性，默认的属性说明如下：</p><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>android:allowBackup，用于指定是否允许备份，开发阶段设置为true，上线时设置为false。
android:icon，用于指定该App在手机屏幕上显示的图标。
android:label，用于指定该App在手机屏幕上显示的名称。
android:supportsRtl，设置为true表示支持阿拉伯语／波斯语这种从右往左的文字排列顺序。
android:theme，用于指定该App的显示风格。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>application节点下还有几个子节点，比如活动activity、服务service、广播接收器receiver、内容提供器provider等</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>manifest</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">xmlns:</span>tools</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/tools<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>application</span>
        <span class="token attr-name"><span class="token namespace">android:</span>allowBackup</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>dataExtractionRules</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@xml/data_extraction_rules<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>fullBackupContent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@xml/backup_rules<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@mipmap/ic_launcher<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@string/app_name<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>supportsRtl</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>theme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@style/Theme.MyApplication<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">tools:</span>targetApi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>29<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activity</span>
            <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>.FullscreenActivity<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>configChanges</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>orientation|keyboardHidden|screenSize<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>exported</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@string/app_name<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>theme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@style/Theme.MyApplication.Fullscreen<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>intent-filter</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>action</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>android.intent.action.MAIN<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>category</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>android.intent.category.LAUNCHER<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>intent-filter</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activity</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>application</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>manifest</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="快捷键" tabindex="-1"><a class="header-anchor" href="#快捷键" aria-hidden="true">#</a> 快捷键</h2><div class="language-mk line-numbers-mode" data-ext="mk"><pre class="language-mk"><code>Ctrl+S：保存文件。
Ctrl+Z：撤销上次的编辑。
Ctrl+Shift+Z：重做上次的编辑，建议改为Ctrl+Y，与Eclipse、UEStudio等工具保持一致。Android Studio默认Ctrl+Y为删除当前行，这点不太好，当你习惯按Ctrl+Y重做上次编辑时，系统却删除了当前行，非常不便。
Ctrl+C：复制。
Ctrl+X：剪切。
Ctrl+V：粘贴。
Ctrl+A：全选。
Delete：删除。
Ctrl+F：查询。
Ctrl+R：替换。
Ctrl+/：注释选中代码（在每行代码前面加双斜杆）。
Ctrl+Shift+/：注释选中的代码段（在选中的代码段前面加“/*”，后面加“*/”）。
Ctrl+Alt+L：格式化选中的代码段。注意该快捷键与QQ默认的热键（锁定QQ）冲突，建议更换快捷键，或者删除QQ的同名热键。
Shift+F6：重命名。建议改为F2，与Wnidows和Eclipse的使用习惯保持一致。
Alt+Enter：给光标所在位置的类导入相应的包。
Shift+F10：运行当前模块。
Ctrl+F5：清理并重新运行当前模块。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改快捷键的方式为：依次选择菜单File→Settings，在弹出的设置窗口中选择Keymap， 在设置界面选中某条快捷键，右击或单击上方的铅笔按钮，在弹出的菜单中选择Add Keyboard Shortcut，然后在键盘上按你要设置的快捷键组合，单击OK按钮，即可完成对应的快捷键设置。</p><h2 id="常用插件推荐" tabindex="-1"><a class="header-anchor" href="#常用插件推荐" aria-hidden="true">#</a> 常用插件推荐</h2><p>路径： 依次选择菜单File→Settings→Plugins→下方按钮Browser repositories</p><ol><li>Android Parcelable code generator</li></ol><p>该插件可自动生成Parcelable接口的代码。开发者先写好一个类和内部变量的定义，然后在代码中按Alt+Insert，弹出的菜单列表下方就有Parcelable选项，如图1-30所示。选中该选项，即在类中插入实现Parcelable接口的代码。</p><ol start="2"><li>Android Code Generator</li></ol><p>该插件可根据布局文件快速生成对应的Activity、Fragment、Adapter、Menu等代码。在布局文件上右击或者在布局文件内部右击，弹出的菜单中多了一个Generate Android Code选项，具体的菜单如图1-31所示。选中生成项后，便会弹出代码窗口，把已生成的代码复制出来即可。注意该插件对汉字的支持不太好，如果XML文件中有汉字，代码就会生成失败。</p><ol start="3"><li>GsonFormat</li></ol><p>该插件能够快速将JSON字符串转换成代码段，包含变量定义以及set、get函数。在代码中按Alt+S，弹出JSON格式化窗口，往窗口中粘贴JSON字符串，单击OK按钮，即可在代码中插入生成好的代码段。</p><ol start="4"><li>Android Postfix Completion</li></ol><p>该插件支持在代码中快速生成Toast、Log等代码行。开发者在代码中输入字符串，后面跟上.toast并回车，即可生成Toast.makeText代码行；输入字符串后，紧接着输入.log并回车，即可生成Log.d代码行。</p><ol start="5"><li>Android Drawable Importer</li></ol><p>该插件可对一张图片自动生成不同分辨率的图片，从而让图片对不同屏幕的适配工作变得更加容易。右击任意目录，在弹出的菜单中选择New，右方弹出的菜单列表末尾会出现*** Drawable Importer之类的菜单项。这里通常选中Batch Drawable Import，在弹出的窗口中选择图片的文件路径，并勾选需要自动生成的分辨率，然后单击OK按钮，即可在drawabe各分辨率的目录下生成对应的图片。</p><h2 id="版本控制工具" tabindex="-1"><a class="header-anchor" href="#版本控制工具" aria-hidden="true">#</a> 版本控制工具</h2>`,37);function f(A,x){const e=t("ExternalLinkIcon"),l=t("RouterLink");return c(),d("div",null,[v,m,k,n("p",null,[n("a",b,[a("http://www.oracle.com/technetwork/java/javase/downloads/index.html"),s(e)])]),g,n("p",null,[n("a",h,[a("http://sdk.android-studio.org/"),s(e)])]),q,n("p",null,[a("参考GIT与SVN 工具的安装与使用 "),s(l,{to:"/posts/git/1.html"},{default:r(()=>[a("GIT与SVN")]),_:1})])])}const y=o(u,[["render",f],["__file","1.html.vue"]]);export{y as default};
