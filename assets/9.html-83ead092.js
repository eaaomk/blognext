import{_ as l,V as o,W as t,X as n,Y as e,$ as s,Z as i,F as r}from"./framework-bcbeea85.js";const d="/blognext/images/a91.png",c="/blognext/images/a92.png",p="/blognext/images/a93.png",u={},b=n("h1",{id:"android-系统编译",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#android-系统编译","aria-hidden":"true"},"#"),e(" Android 系统编译")],-1),m=n("h2",{id:"编译环境",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#编译环境","aria-hidden":"true"},"#"),e(" 编译环境")],-1),g=n("p",null,"在编译之前，我们需要运行以下命令，构造编译环境",-1),v={href:"https://source.android.google.cn/docs/setup/build/initializing",target:"_blank",rel:"noopener noreferrer"},h=i(`<p>Linux版本号高于18.0,所以输入以下命令的操作，其余版本参考官方文档</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> git-core gnupg flex bison build-essential <span class="token function">zip</span> <span class="token function">curl</span> zlib1g-dev gcc-multilib g++-multilib libc6-dev-i386 libncurses5 lib32ncurses5-dev x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils xsltproc <span class="token function">unzip</span> fontconfig
<span class="token comment"># 更新</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="同步代码" tabindex="-1"><a class="header-anchor" href="#同步代码" aria-hidden="true">#</a> 同步代码</h2>`,3),f={href:"https://source.android.google.cn/docs/setup/build/downloading#obtaining-proprietary-binaries",target:"_blank",rel:"noopener noreferrer"},_=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> .repo/manifests
<span class="token function">git</span> reset <span class="token parameter variable">--hard</span> remotes/origin/android-13.0.0_r12
repo init <span class="token parameter variable">-u</span> https://mirrors.tuna.tsinghua.edu.cn/git/AOSP/platform/manifest <span class="token parameter variable">-b</span> android-13.0.0_r12
repo <span class="token function">sync</span> <span class="token parameter variable">-j4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>上二手市场查看，Pixel4a 比较便宜，并且该机器支持android13，对比官方版本</li></ul><figure><img src="`+d+'" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><ul><li>于是我们选择与该机器匹配的android-13.0.0_r12版本，同步代码</li></ul><h2 id="下载驱动" tabindex="-1"><a class="header-anchor" href="#下载驱动" aria-hidden="true">#</a> 下载驱动</h2>',5),k={href:"https://developers.google.cn/android/drivers?utm_source=source.android.google.cn&utm_medium=referral",target:"_blank",rel:"noopener noreferrer"},x=i('<figure><img src="'+c+`" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>如图，我们选择下载改版本的驱动包， 每组驱动包二进制文件都有压缩存档中的自解压脚本提供。从源代码树的根目录运行包含的自解压脚本解压缩每个存档，然后确认同意随附许可协议的条款。二进制文件及其匹配的 makefile 安装在源代码树的vendor/层次结构中。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> <span class="token punctuation">[</span>压缩文件<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下载完驱动后，为了保证新的驱动文件能够编译生效，需要清除之前的构建信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span> clobber
开始编译
<span class="token comment">#在代码根目录下输入</span>
<span class="token builtin class-name">source</span> build/envsetup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),z={href:"https://source.android.google.cn/docs/setup/build/running?hl=zh-cn#selecting-device-build",target:"_blank",rel:"noopener noreferrer"},y=i('<figure><img src="'+p+`" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>接下来输入对应的lunch命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lunch aosp_bramble-userdebug
<span class="token comment"># 或者不指定版本，直接输入lunch，会弹出一列选项，输入对应的数字编号也可进行编译</span>
执行编译命令
<span class="token function">make</span> <span class="token parameter variable">-j6</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">|</span> <span class="token function">tee</span> build.log
<span class="token comment"># 编译成功显示如下日志：</span>
build completed successfully
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译成功后，可以在代码根目录的out/target/product路径下找到对应的img包 开始刷机</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>adb <span class="token function">reboot</span> fastboot

<span class="token comment"># 等待手机进入 fastboot 界面之后</span>
fastboot flashall <span class="token parameter variable">-w</span>

<span class="token comment"># 刷机完成之后，执行 fastboot reboot 长期系统即可</span>
fastboot <span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),N={href:"https://developers.google.cn/android/images",target:"_blank",rel:"noopener noreferrer"};function P(V,w){const a=r("ExternalLinkIcon");return o(),t("div",null,[b,m,g,n("p",null,[e("官方文档地址："),n("a",v,[e("https://source.android.google.cn/docs/setup/build/initializing"),s(a)])]),h,n("p",null,[e("官方拉取代码文档地址："),n("a",f,[e("https://source.android.google.cn/docs/setup/build/downloading#obtaining-proprietary-binaries"),s(a)])]),_,n("p",null,[e("选择对应机器的驱动进行下载，这里准备的是Pixel4a，指定的是r12版本为22年11月5号的版本，故我们需要下载对应的驱动： 驱动地址："),n("a",k,[e("官方地址，点击前往"),s(a)])]),x,n("p",null,[e("根据官方文档： "),n("a",z,[e("官方版本对应文档地址"),s(a)]),e("，查询，Pixel 4a 5G为 aosp_bramble-userdebug")]),y,n("p",null,[e("fastboot flashall -w命令如果在工程外面执行，要配置$ANDROID_PRODUCT_OUT目录环境 如果刷机出现问题，可以下载官方刷机包拯救机器："),n("a",N,[e("官方刷机包地址"),s(a)])])])}const A=l(u,[["render",P],["__file","9.html.vue"]]);export{A as default};
