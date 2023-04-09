import{_ as t,V as n,W as d,Z as i}from"./framework-bcbeea85.js";const e={},s=i(`<h1 id="git与svn的安装配置" tabindex="-1"><a class="header-anchor" href="#git与svn的安装配置" aria-hidden="true">#</a> Git与SVN的安装配置</h1><h2 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h2><ol><li>官网下载对应的安装包无脑下一步安装完毕</li><li>基础配置：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment">## 用户信息</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;eaaomk&quot;</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email eaaomk@163.com
<span class="token function">git</span> remote <span class="token function">add</span> origin https://gitee.com/serendipity-z/blognext.git
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin <span class="token string">&quot;master&quot;</span>

<span class="token comment">## 设置文本编辑器  Vim 或者 emacs</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> core.editor emacs

<span class="token comment">## 差异分析工具</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> merge.tool vimdiff

<span class="token comment">## 查看配置信息</span>

<span class="token function">vim</span> ~/.gitconfig 

<span class="token function">git</span> config <span class="token parameter variable">--list</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>常用命令：</li></ol><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td>git init</td><td>初始化仓库。</td></tr><tr><td>git add .</td><td>添加文件到暂存区。</td></tr><tr><td>git commit</td><td>将暂存区内容添加到仓库中。</td></tr><tr><td>创建仓库命令</td><td></td></tr><tr><td>git init</td><td>初始化仓库</td></tr><tr><td>git clone</td><td>拷贝一份远程仓库，也就是下载一个项目。</td></tr><tr><td>提交与修改</td><td></td></tr><tr><td>git add</td><td>添加文件到暂存区</td></tr><tr><td>git status</td><td>查看仓库当前的状态，显示有变更的文件。</td></tr><tr><td>git diff</td><td>比较文件的不同，即暂存区和工作区的差异。</td></tr><tr><td>git commit</td><td>提交暂存区到本地仓库。</td></tr><tr><td>git reset</td><td>回退版本。</td></tr><tr><td>git rm</td><td>将文件从暂存区和工作区中删除。</td></tr><tr><td>git mv</td><td>移动或重命名工作区文件。</td></tr><tr><td>提交日志</td><td></td></tr><tr><td>git log</td><td>查看历史提交记录</td></tr><tr><td>git blame (file)</td><td>以列表形式查看指定文件的历史修改记录</td></tr><tr><td>远程操作</td><td></td></tr><tr><td>git remote</td><td>远程仓库操作</td></tr><tr><td>git fetch</td><td>从远程获取代码库</td></tr><tr><td>git pull</td><td>下载远程代码并合并</td></tr><tr><td>git push</td><td>上传远程代码并合并</td></tr><tr><td>git branch (branchname)</td><td>查看分支，创建新分支</td></tr><tr><td>git checkout (branchname)</td><td>切换分支</td></tr><tr><td>git merge</td><td>合并分支</td></tr><tr><td>git clean -df</td><td>删除本地新增文件</td></tr><tr><td>git checkout .</td><td>删除本地修改</td></tr><tr><td>git rebase</td><td>重置索引head的指向</td></tr><tr><td>git branch -vv</td><td>查看分支信息</td></tr><tr><td>git branch -d (branchname)</td><td>删除指定分支</td></tr><tr><td>git brnach -b (branchname)</td><td>创建新分支并切换到此新分支上</td></tr><tr><td>git commit -m &quot;&quot;</td><td>附带提交信息的提交</td></tr><tr><td>git commit --amend</td><td>追加提交</td></tr><tr><td>git reset HEAD^</td><td>回退上一次提交</td></tr></tbody></table><ol start="4"><li>linux上简化命令操作</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>


<span class="token comment">#####################</span>
<span class="token comment">### Author: eaaomk</span>
<span class="token comment">### blog: https://eaaomk.github.io/blog/</span>
<span class="token comment">### des: 执行此脚本，将下列快捷命令书写到linux 下的</span>
<span class="token comment">###      .bashrc（root用户）文件中，.bash_profile是非管理员用户会走的路径</span>
<span class="token comment">#####################</span>

<span class="token function-name function">thisecho</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;

echo &quot;---bash profile=====&quot;
source ~/.bashrc

ap(){
	# Automatic push
	value=\`git rev-parse --abbrev-ref --symbolic-full-name @{u}\`
	if [ -z &quot;$value&quot; ]
	then
		echo -e &quot;\\e[1;31m push to the default branch \\e[0m&quot; 
		temp=\`git branch -r | grep m/master\`
		real_url=\${temp#*-&gt;}
	else
		real_url=$value
		echo -e &quot;\\e[1;31m current branch is \${real_url} \\e[0m&quot; 
	fi
		git push origin HEAD:refs/for/\${real_url#*/}
}

acp(){
	# Automatic commit and push
	ac
	ap
}

ac(){
# Automatic commit
read -p &quot;BUG ID: &quot; msg1
	read -p &quot;DESCRIPTION: &quot; msg2
	echo &quot;
BUG ID:$msg1
DESCRIPTION:$msg2&quot; | git commit -F-
}
&#39;</span><span class="token operator">&gt;&gt;</span> ~/.bash_profile

<span class="token function">sync</span>

<span class="token builtin class-name">source</span> ~/.bash_profile
<span class="token punctuation">}</span>

thisecho

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="svn" tabindex="-1"><a class="header-anchor" href="#svn" aria-hidden="true">#</a> SVN</h2><p>SVN是版本控制工具，安装步骤：</p><p>步骤01　在本机上安装TortoiseSVN。首先下载TortoiseSVN安装包，然后在安装时选择command line client tools，这样安装后在bin目录下才能找到命令行工具svn.exe。</p><p>步骤02　在Android Studio中配置TortoiseSVN的命令行工具。打开Android Studio，依次选择菜单File→Settings→Version Control→Subversion→user command line client，单击右侧的浏览按钮，选择本地安装的svn.exe的完整路径。</p><p>步骤03　在Android Studio中使用SVN检出项目。打开Android Studio，依次选择菜单VCS→Checkout from Version Control→Subversion，单击Repositories右方的加号按钮，在弹出的小窗口中输入SVN仓库地址，单击OK按钮，回到原窗口单击Checkout按钮，把项目检出到本地目录。</p><p>这里更推荐Git 工具</p><h2 id="git与svn的不同" tabindex="-1"><a class="header-anchor" href="#git与svn的不同" aria-hidden="true">#</a> Git与SVN的不同</h2><h3 id="git是分布式的-svn是集中式的" tabindex="-1"><a class="header-anchor" href="#git是分布式的-svn是集中式的" aria-hidden="true">#</a> Git是分布式的，SVN是集中式的</h3><p>SVN必须有一个服务器版本库就放在一个中央服务器。所有开发人员都是与服务器进行交互的。</p><p>Git更倾向于分布式开发，每台计算机上都有一个完整的本地版本库,和服务器上的一模一样。所以即使没有网络也一样可以Commit，查看历史版本记录，创建项 目分支等操作。也有中心服务器，仅仅是为了方便交换大家的修改。</p><p>去中心化的好处？</p><p>操作处理速度快</p><p>安全性更高。Git每个人的电脑都有完整的版本库，SVN集中式版本控制的中央服务器要是出了问题，所有人都没法干活了，一次需要定期备份，并且是整个SVN都得备份</p><p>不依赖网络</p><h3 id="git把内容按元数据方式存储-而svn是按文件" tabindex="-1"><a class="header-anchor" href="#git把内容按元数据方式存储-而svn是按文件" aria-hidden="true">#</a> Git把内容按元数据方式存储，而SVN是按文件</h3><p>SVN保存前后变化的差异数据</p><p>Git只关心文件数据的整体发生变化，更像是把文件做快照，文件没有改变时，分支只想这个文件的指针不会改变，文件发生改变，指针指向新版本</p><h3 id="git没有一个全局版本号-而svn有" tabindex="-1"><a class="header-anchor" href="#git没有一个全局版本号-而svn有" aria-hidden="true">#</a> Git没有一个全局版本号，而SVN有</h3><p>SVN版本号进行控制，每次操作都会产生一个高版本号</p><p>Git采用40 位长的哈希值作为版本号，没有先后之分</p><h3 id="git的内容的完整性要优于svn" tabindex="-1"><a class="header-anchor" href="#git的内容的完整性要优于svn" aria-hidden="true">#</a> Git的内容的完整性要优于SVN</h3><p>GIT的内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏</p><h3 id="分支不同" tabindex="-1"><a class="header-anchor" href="#分支不同" aria-hidden="true">#</a> 分支不同</h3><p>Svn 创建分支，其实就是创建了一个新的文件夹（目录）并拥有实际的文件的。相当于拷贝了一份源文件。创建完分支后，影响全部成员，每个人都会拥有这个分支。拉分支相当于copy时间较慢。多分支并行开发较重。</p><p>Git可以在任意一个提交点（commit point）开启分支，并没有创建文件夹，你甚至看不到任何的改变。创建一个分支，就是多了一个索引文件，记录这个分支的变化，占用很小的空间。拉分支时间较快，拉分支只是创建文件的指针和HEAD。用户可以在同一个文件夹中，快速的切换不同的分支。每个分支，都是独立的，在这个分支里想做什么都可以，对其他分支没有一点影响。比较适合多分支并行开发。</p><h3 id="管理权限不同" tabindex="-1"><a class="header-anchor" href="#管理权限不同" aria-hidden="true">#</a> 管理权限不同</h3><p>svn的权限管理相当严格，可以按组、个人针对某个子目录的权限控制</p><p>Git没有严格的权限管理控制，只有账号角色划分</p><h3 id="工作流程不同" tabindex="-1"><a class="header-anchor" href="#工作流程不同" aria-hidden="true">#</a> 工作流程不同</h3><p>SVN每次更改文件之前都得update操作，有冲突，会打断提交动作</p><p>Git开始工作前进行fetch操作，完成开发工作后push操作，有冲突解决冲突。git的提交过程不会被打断，有冲突会标记冲突文件</p><h2 id="git与svn对比" tabindex="-1"><a class="header-anchor" href="#git与svn对比" aria-hidden="true">#</a> Git与SVN对比</h2><table><thead><tr><th>作用</th><th>git</th><th>svn</th></tr></thead><tbody><tr><td>版本库初始化</td><td>git init</td><td>svn create</td></tr><tr><td>clone</td><td>git clone</td><td>svn co（checkout）</td></tr><tr><td>add</td><td>git add （.除去.gitignore，*所有的文件）</td><td>svn add</td></tr><tr><td>commit</td><td>git commit</td><td>svn commit</td></tr><tr><td>pull</td><td>git pull</td><td>svn update</td></tr><tr><td>push</td><td>git push</td><td>-</td></tr><tr><td>查看工作状态</td><td>git status</td><td>svn status</td></tr><tr><td>创建分支</td><td>git branch &lt;分支名&gt;</td><td>svn cp &lt;分支名&gt;</td></tr><tr><td>删除分支</td><td>git branch -d &lt;分支名&gt;</td><td>svn rm &lt;分支名&gt;</td></tr><tr><td>分支合并</td><td>git merge &lt;分支名&gt;</td><td>svn merge &lt;分支名&gt;</td></tr><tr><td>工作区差异</td><td>git differ （-cached / head）</td><td>svn diff</td></tr><tr><td>更新至历史版本</td><td>git checkout commit</td><td>svn update -r rev</td></tr><tr><td>切换tag</td><td>git checkout tag</td><td>svn switch tag</td></tr><tr><td>切换分支</td><td>git checkout branch</td><td>svn switch branch</td></tr><tr><td>还原文件</td><td>git checkout - path</td><td>svn revert path</td></tr><tr><td>删除文件</td><td>git rm path</td><td>svn rm path</td></tr><tr><td>移动文件</td><td>git mv path</td><td>svn mv path</td></tr><tr><td>清除未追踪文件</td><td>git clean</td><td>svn status sed -e</td></tr></tbody></table>`,41),a=[s];function r(l,c){return n(),d("div",null,a)}const v=t(e,[["render",r],["__file","1.html.vue"]]);export{v as default};
