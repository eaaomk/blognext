const a=JSON.parse('{"key":"v-fd5f8252","path":"/posts/os/8.html","title":"进程与线程的重要知识点问题","lang":"zh-CN","frontmatter":{"lastUpdated":true,"description":"进程与线程的重要知识点问题 什么是前趋图?为什么要引入前趋图? 前驱图(PrecedenceGraph)是一个有向无循环图，记为DAG(DirectedAcyclicGraph)，用于描述进程之间执行的前后关系。 试画出下面四条语句的前趋图: S1:a=x+y; S2:b=2+1; S3:c=a-b; S4:w=c+1;","head":[["meta",{"property":"og:url","content":"https://eaaomk.github.io/blognext/blognext/posts/os/8.html"}],["meta",{"property":"og:site_name","content":"欢迎你"}],["meta",{"property":"og:title","content":"进程与线程的重要知识点问题"}],["meta",{"property":"og:description","content":"进程与线程的重要知识点问题 什么是前趋图?为什么要引入前趋图? 前驱图(PrecedenceGraph)是一个有向无循环图，记为DAG(DirectedAcyclicGraph)，用于描述进程之间执行的前后关系。 试画出下面四条语句的前趋图: S1:a=x+y; S2:b=2+1; S3:c=a-b; S4:w=c+1;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-28T15:26:49.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-28T15:26:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"进程与线程的重要知识点问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-01-28T15:26:49.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1674919609000,"updatedTime":1674919609000,"contributors":[{"name":"qiang.zhang","email":"eaaomk@163.com","commits":1}]},"readingTime":{"minutes":8.71,"words":2614},"filePathRelative":"posts/os/8.md","localizedDate":"2023年1月28日","excerpt":"<h1> 进程与线程的重要知识点问题</h1>\\n<ol>\\n<li>什么是前趋图?为什么要引入前趋图?</li>\\n</ol>\\n<p>前驱图(PrecedenceGraph)是一个有向无循环图，记为DAG(DirectedAcyclicGraph)，用于描述进程之间执行的前后关系。</p>\\n<ol start=\\"2\\">\\n<li>试画出下面四条语句的前趋图:</li>\\n</ol>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code>   <span class=\\"token constant\\">S1</span><span class=\\"token operator\\">:</span>a<span class=\\"token operator\\">=</span>x<span class=\\"token operator\\">+</span>y<span class=\\"token punctuation\\">;</span>\\n   <span class=\\"token constant\\">S2</span><span class=\\"token operator\\">:</span>b<span class=\\"token operator\\">=</span><span class=\\"token number\\">2</span><span class=\\"token operator\\">+</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n   <span class=\\"token constant\\">S3</span><span class=\\"token operator\\">:</span>c<span class=\\"token operator\\">=</span>a<span class=\\"token operator\\">-</span>b<span class=\\"token punctuation\\">;</span>\\n   <span class=\\"token constant\\">S4</span><span class=\\"token operator\\">:</span>w<span class=\\"token operator\\">=</span>c<span class=\\"token operator\\">+</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{a as data};
