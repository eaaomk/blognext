const e=JSON.parse('{"key":"v-7bca1f84","path":"/android/13.html","title":"Service 基础知识","lang":"zh-CN","frontmatter":{"lastUpdated":true,"description":"Service 基础知识 概念 Service 是一种可在后台执行长时间运行操作而不提供界面的应用组件。服务可由其他应用组件启动，而且即使用户切换到其他应用，服务仍将在后台继续运行。此外，组件可通过绑定到服务与之进行交互，甚至是执行进程间通信 (IPC)。例如，服务可在后台处理网络事务、播放音乐，执行文件 I/O 或与内容提供程序进行交互。 服务的分类 前台服务 前台服务执行一些用户能注意到的操作。例如，音频应用会使用前台服务来播放音频曲目。前台服务必须显示通知。即使用户停止与应用的交互，前台服务仍会继续运行。","head":[["meta",{"property":"og:url","content":"https://eaaomk.github.io/blognext/blognext/android/13.html"}],["meta",{"property":"og:site_name","content":"欢迎你"}],["meta",{"property":"og:title","content":"Service 基础知识"}],["meta",{"property":"og:description","content":"Service 基础知识 概念 Service 是一种可在后台执行长时间运行操作而不提供界面的应用组件。服务可由其他应用组件启动，而且即使用户切换到其他应用，服务仍将在后台继续运行。此外，组件可通过绑定到服务与之进行交互，甚至是执行进程间通信 (IPC)。例如，服务可在后台处理网络事务、播放音乐，执行文件 I/O 或与内容提供程序进行交互。 服务的分类 前台服务 前台服务执行一些用户能注意到的操作。例如，音频应用会使用前台服务来播放音频曲目。前台服务必须显示通知。即使用户停止与应用的交互，前台服务仍会继续运行。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T14:19:09.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T14:19:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Service 基础知识\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-10T14:19:09.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"服务的分类","slug":"服务的分类","link":"#服务的分类","children":[{"level":3,"title":"前台服务","slug":"前台服务","link":"#前台服务","children":[]},{"level":3,"title":"后台服务","slug":"后台服务","link":"#后台服务","children":[]},{"level":3,"title":"绑定服务","slug":"绑定服务","link":"#绑定服务","children":[]}]},{"level":2,"title":"服务的运行","slug":"服务的运行","link":"#服务的运行","children":[]},{"level":2,"title":"Service 的各个方法的解释","slug":"service-的各个方法的解释","link":"#service-的各个方法的解释","children":[{"level":3,"title":"onStartCommand()","slug":"onstartcommand","link":"#onstartcommand","children":[]},{"level":3,"title":"onBind()","slug":"onbind","link":"#onbind","children":[]},{"level":3,"title":"onCreate()","slug":"oncreate","link":"#oncreate","children":[]},{"level":3,"title":"onDestroy()","slug":"ondestroy","link":"#ondestroy","children":[]}]},{"level":2,"title":"清单配置文件","slug":"清单配置文件","link":"#清单配置文件","children":[]},{"level":2,"title":"服务的生命周期","slug":"服务的生命周期","link":"#服务的生命周期","children":[]},{"level":2,"title":"扩展应用","slug":"扩展应用","link":"#扩展应用","children":[]}],"git":{"createdTime":1678457949000,"updatedTime":1678457949000,"contributors":[{"name":"qiang.zhang","email":"eaaomk@163.com","commits":1}]},"readingTime":{"minutes":6.62,"words":1985},"filePathRelative":"android/13.md","localizedDate":"2023年3月10日","excerpt":"<h1> Service 基础知识</h1>\\n<h2> 概念</h2>\\n<p>Service 是一种可在后台执行长时间运行操作而不提供界面的应用组件。服务可由其他应用组件启动，而且即使用户切换到其他应用，服务仍将在后台继续运行。此外，组件可通过绑定到服务与之进行交互，甚至是执行进程间通信 (IPC)。例如，服务可在后台处理网络事务、播放音乐，执行文件 I/O 或与内容提供程序进行交互。</p>\\n<h2> 服务的分类</h2>\\n<h3> 前台服务</h3>\\n<p>前台服务执行一些用户能注意到的操作。例如，音频应用会使用前台服务来播放音频曲目。前台服务必须显示通知。即使用户停止与应用的交互，前台服务仍会继续运行。</p>","autoDesc":true}');export{e as data};