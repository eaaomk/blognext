const t=JSON.parse('{"key":"v-03c9c588","path":"/android/6.html","title":"Activity 问题大盘点","lang":"zh-CN","frontmatter":{"lastUpdated":true,"description":"Activity 问题大盘点 旧页面以下简称A1 新的页面以下简称A2 打开透明Acitivty的生命周期？ 当A2是透明主题时，A1不会走onStop，会停留在onPause，此时事件无法传递到A2，因为A1当前是无法交互的，当前处于onResume 的是A2。 打开对话框Acitivty的生命周期？ 打开对话框A2时，A1此时处于局部可见，只会走向onPause，不会走向onStop。 此时如果关闭屏幕或者按Home按键，A2-onPause()--&gt;onStop()--&gt;A1-onStop()","head":[["meta",{"property":"og:url","content":"https://eaaomk.github.io/blognext/blognext/android/6.html"}],["meta",{"property":"og:site_name","content":"欢迎你"}],["meta",{"property":"og:title","content":"Activity 问题大盘点"}],["meta",{"property":"og:description","content":"Activity 问题大盘点 旧页面以下简称A1 新的页面以下简称A2 打开透明Acitivty的生命周期？ 当A2是透明主题时，A1不会走onStop，会停留在onPause，此时事件无法传递到A2，因为A1当前是无法交互的，当前处于onResume 的是A2。 打开对话框Acitivty的生命周期？ 打开对话框A2时，A1此时处于局部可见，只会走向onPause，不会走向onStop。 此时如果关闭屏幕或者按Home按键，A2-onPause()--&gt;onStop()--&gt;A1-onStop()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-10T14:19:09.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-10T14:19:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Activity 问题大盘点\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-10T14:19:09.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1678457949000,"updatedTime":1678457949000,"contributors":[{"name":"qiang.zhang","email":"eaaomk@163.com","commits":1}]},"readingTime":{"minutes":8.82,"words":2646},"filePathRelative":"android/6.md","localizedDate":"2023年3月10日","excerpt":"<h1> Activity 问题大盘点</h1>\\n<p>旧页面以下简称A1 新的页面以下简称A2</p>\\n<ol>\\n<li>打开透明Acitivty的生命周期？</li>\\n</ol>\\n<p>当A2是透明主题时，A1不会走onStop，会停留在onPause，此时事件无法传递到A2，因为A1当前是无法交互的，当前处于onResume 的是A2。</p>\\n<ol start=\\"2\\">\\n<li>打开对话框Acitivty的生命周期？</li>\\n</ol>\\n<p>打开对话框A2时，A1此时处于局部可见，只会走向onPause，不会走向onStop。\\n此时如果关闭屏幕或者按Home按键，A2-onPause()--&gt;onStop()--&gt;A1-onStop()</p>","autoDesc":true}');export{t as data};
