import{_ as e,V as a,W as i,Z as n}from"./framework-bcbeea85.js";const s={},l=n(`<h1 id="java-环境搭建" tabindex="-1"><a class="header-anchor" href="#java-环境搭建" aria-hidden="true">#</a> Java 环境搭建</h1><ol><li>官网下载对应的安装包无脑next即可，或者自己指定JDk的安装目录</li><li>配置环境变量，不需要设置用户环境变量</li></ol><p>系统环境变量配置：</p><div class="language-bat line-numbers-mode" data-ext="bat"><pre class="language-bat"><code>变量名：JAVA_HOME
变量值：C:\\Program Files (x86)\\Java\\jdk1.8.0_91   // 要根据自己的实际路径配置
CLASSPATH 1.5 以上后不需要配置了
变量名：Path
变量值：%JAVA_HOME%\\bin;%JAVA_HOME%\\jre\\bin;   
//JDK11只有一个bin，直接配置路径也行，不需要强制使用JAVA_HOME
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),d=[l];function r(t,c){return a(),i("div",null,d)}const v=e(s,[["render",r],["__file","1.html.vue"]]);export{v as default};
