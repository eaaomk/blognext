const n=JSON.parse('{"key":"v-e1eb7f2e","path":"/posts/c/1.html","title":"fork 函数","lang":"zh-CN","frontmatter":{"lastUpdated":true,"description":"fork 函数 源代码 #include &lt;stdio.h&gt; #include &lt;stdlib.h&gt; #include &lt;unistd.h&gt; int cnt = 1; int main(void) { //派生进程 pid_t pid = fork(); //派生失败 if(pid &lt; 0) { perror(\\"fork error\\"); exit(1); } //派生成功返回值为0表示子进程 else if(pid == 0) { printf(\\"\\\\nchild: forkval=%d pid=%d cnt=%d\\\\n\\", pid, getpid(), ++cnt); } //派生成功返回值大于0表示父进程，父进程中将返回子进程的PID。 else if(pid &gt; 0) { printf(\\"\\\\nparent: forkval=%d pid=%d cnt=%d\\\\n\\", pid, getpid(), cnt); } return 0; }","head":[["meta",{"property":"og:url","content":"https://eaaomk.github.io/blognext/blognext/posts/c/1.html"}],["meta",{"property":"og:site_name","content":"欢迎你"}],["meta",{"property":"og:title","content":"fork 函数"}],["meta",{"property":"og:description","content":"fork 函数 源代码 #include &lt;stdio.h&gt; #include &lt;stdlib.h&gt; #include &lt;unistd.h&gt; int cnt = 1; int main(void) { //派生进程 pid_t pid = fork(); //派生失败 if(pid &lt; 0) { perror(\\"fork error\\"); exit(1); } //派生成功返回值为0表示子进程 else if(pid == 0) { printf(\\"\\\\nchild: forkval=%d pid=%d cnt=%d\\\\n\\", pid, getpid(), ++cnt); } //派生成功返回值大于0表示父进程，父进程中将返回子进程的PID。 else if(pid &gt; 0) { printf(\\"\\\\nparent: forkval=%d pid=%d cnt=%d\\\\n\\", pid, getpid(), cnt); } return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-28T15:26:49.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-28T15:26:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"fork 函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-01-28T15:26:49.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"源代码","slug":"源代码","link":"#源代码","children":[]},{"level":3,"title":"编译执行结果","slug":"编译执行结果","link":"#编译执行结果","children":[]},{"level":3,"title":"父子进程有什么区别呢？","slug":"父子进程有什么区别呢","link":"#父子进程有什么区别呢","children":[]},{"level":3,"title":"函数原型","slug":"函数原型","link":"#函数原型","children":[]},{"level":3,"title":"返回值","slug":"返回值","link":"#返回值","children":[]},{"level":3,"title":"进程标识符","slug":"进程标识符","link":"#进程标识符","children":[]},{"level":3,"title":"概要","slug":"概要","link":"#概要","children":[]},{"level":3,"title":"fork执行执行流程","slug":"fork执行执行流程","link":"#fork执行执行流程","children":[]},{"level":3,"title":"为什么fork会返回两次呢？","slug":"为什么fork会返回两次呢","link":"#为什么fork会返回两次呢","children":[]},{"level":3,"title":"为什么pid在父子进程中不同呢？","slug":"为什么pid在父子进程中不同呢","link":"#为什么pid在父子进程中不同呢","children":[]},{"level":3,"title":"fork派生可能出现的错误原因是什么呢？","slug":"fork派生可能出现的错误原因是什么呢","link":"#fork派生可能出现的错误原因是什么呢","children":[]},{"level":3,"title":"fork系统调用使用注意","slug":"fork系统调用使用注意","link":"#fork系统调用使用注意","children":[]}],"git":{"createdTime":1674919609000,"updatedTime":1674919609000,"contributors":[{"name":"qiang.zhang","email":"eaaomk@163.com","commits":1}]},"readingTime":{"minutes":3.7,"words":1111},"filePathRelative":"posts/c/1.md","localizedDate":"2023年1月28日","excerpt":"<h1> fork 函数</h1>\\n<h3> 源代码</h3>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;stdio.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;stdlib.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;unistd.h&gt;</span></span>\\n\\n<span class=\\"token keyword\\">int</span> cnt <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">//派生进程</span>\\n    <span class=\\"token class-name\\">pid_t</span> pid <span class=\\"token operator\\">=</span> <span class=\\"token function\\">fork</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">//派生失败</span>\\n    <span class=\\"token keyword\\">if</span><span class=\\"token punctuation\\">(</span>pid <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">perror</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"fork error\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token function\\">exit</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token comment\\">//派生成功返回值为0表示子进程</span>\\n    <span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span><span class=\\"token punctuation\\">(</span>pid <span class=\\"token operator\\">==</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"\\\\nchild: forkval=%d pid=%d cnt=%d\\\\n\\"</span><span class=\\"token punctuation\\">,</span> pid<span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">getpid</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">++</span>cnt<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token comment\\">//派生成功返回值大于0表示父进程，父进程中将返回子进程的PID。</span>\\n    <span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span><span class=\\"token punctuation\\">(</span>pid <span class=\\"token operator\\">&gt;</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"\\\\nparent: forkval=%d pid=%d cnt=%d\\\\n\\"</span><span class=\\"token punctuation\\">,</span> pid<span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">getpid</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> cnt<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        \\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
