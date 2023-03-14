import{_ as s,V as d,W as r,X as t,Y as e,$ as n,a0 as a,Z as l,F as c}from"./framework-bcbeea85.js";const v="/blognext/images/2-14.png",u="/blognext/images/2-15.png",o={},m=l(`<h1 id="进程同步" tabindex="-1"><a class="header-anchor" href="#进程同步" aria-hidden="true">#</a> 进程同步</h1><p>在OS中引入进程后，一方面可以使系统中的多道程序并发执行，这不仅能有效地改善资源利用率，还可以显著地提高系统的吞吐量，但另一方面却使系统变得更加复杂。如果不能采取有效的措施,对多个进程的运行进行妥善的管理,必然会因为这些进程对系统资源的无序争夺给系统造成混乱。致使每次处理的结果存在着不确定性,即显现出其不可再现性。为保证多个进程能有条不紊地运行,在多道程序系统中,必须引入进程同步机制。在本文中,将详细介绍在单处理机系统中的进程同步机制硬件同步机制、信号量机制管程机制等,利用它们来保证程序执行的可再现性。</p><h3 id="进程同步的基本概念" tabindex="-1"><a class="header-anchor" href="#进程同步的基本概念" aria-hidden="true">#</a> 进程同步的基本概念</h3><p>进程同步机制的主要任务,是对多个相关进程在执行次序上进行协调,使并发执行的诸进程之间能按照一定的规则(或时序)共享系统资源,并能很好地相互合作,从而使程序的执行具有可再现性。</p><h4 id="两种形式的制约关系" tabindex="-1"><a class="header-anchor" href="#两种形式的制约关系" aria-hidden="true">#</a> 两种形式的制约关系</h4><p>在多道程序环境下,对于同处于一个系统中的多个进程,由于它们共享系统中的资源,或为完成某一任务而相互合作,它们之间可能存在着以下两种形式的制约关系：</p><ol><li>间接相互制约关系多个程序在并发执行时,由于共享系统资源,如CPU、IO设备等,致使在这些并发执行的程序之间形成相互制约的关系。对于像打印机、磁带机这样的临界资源,必须保证多个进程对之只能互斥地访问,由此,在这些进程间形成了源于对该类资源共享的所谓间接相互制约关系。为了保证这些进程能有序地运行,对于系统中的这类资源,必须由系统实施统一分配,即用户在要使用之前,应先提出申请,而不允许用户进程直接使用。</li><li>直接相互制约关系某些应用程序,为了完成某任务而建立了两个或多个进程。这些进程将为完成同一项任务而相互合作。进程间的直接制约关系就是源于它们之间的相互合作。例如,有两个相互合作的进程—输入进程A和计算进程B,它们之间共享一个缓冲区。进程A通过缓冲向进程B提供数据。进程B从缓冲中取出数据,并对数据进行处理。但如果该缓冲空时,计算进程因不能获得所需数据而被阻塞。一旦进程A把数据输入缓冲区后便将进程B唤醒反之,当缓冲区已满时,进程A因不能再向缓冲区投放数据而被阻塞,当进程B将缓冲区数据取走后便可唤醒A在多道程序环境下,由于存在着上述两类相互制约关系,进程在运行过程中是否能获得处理机运行与以怎样的速度运行,并不能由进程自身所控制,此即进程的异步性。由此会产生对共享变量或数据结构等资源不正确的访问次序,从而造成进程每次执行结果的不致。这种差错往往与时间有关,故称为“与时间有关的错误”。为了杜绝这种差错,必须对进程的执行次序进行协调,保证诸进程能按序执行</li></ol><h4 id="临界资源-critical-resouce" tabindex="-1"><a class="header-anchor" href="#临界资源-critical-resouce" aria-hidden="true">#</a> 临界资源( Critical Resouce)</h4><p>许多硬件资源如打印机、磁带机等,都属于临界资源,诸进程间应采取互斥方式,实现对这种资源的共享。下面我们将通过一个简单的例子来说明这一过程生产者消费者(producer-consumer)问题是一个著名的进程同步问题。</p><ul><li>它描述的是:有群生产者进程在生产产品,并将这些产品提供给消费者进程去消费。</li></ul><p>为使生产者进程与消费者进程能并发执行,在两者之间设置了一个具有n个缓冲区的缓冲池,生产者进程将其所生产的产品放入一个缓冲区中;消费者进程可从一个缓冲区中取走产品去消费。尽管所有的生产者进程和消费者进程都是以异步方式运行的,但它们之间必须保持同步,既不允许消费者进程到一个空缓冲区去取产品,也不允许生产者进程向一个已装满产品且尚未被取走的缓冲区中投放产品。</p><p>我们可利用一个数组buffer来表示上述的具有n个缓冲区的缓冲池。每投入(或取出)一个产品时,缓冲池 buffer中暂存产品(或已取走产品的空闲单元)的数组单元指针in(或out)加1。由于这里由buffer组成的缓冲池是被组织成循环缓冲的,故应把输入指针in(或输出指针out)加1,表示成in=(in+1)%n(或out=(out+1)%n)。当(in+1)%n=out时表示缓冲池满;而in=out则表示缓冲池空。此外,还引入了一个整型变量 counter,其初始值为0。每当生产者进程向缓冲池中投放(或取走)一个产品后,使 counter加1(或减1)。生产者和消费者两进程共享下面的变量:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int in = 0,out =0,count = 0;
item buffer[n];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>指针in和out 初始化为0.在生产者进程中使用一局部变量nextp,用户暂时存放每次刚刚生产出来的产品；而在消费者进程中，则使用一个局部变量nextc，用于存放每次需要消费的产品。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void producer(){
    while(1){
        produce an item in nextp;
        ...
        while(counter == n)
        ;
        buffer [in] = nextp;
        in = (in+1)%n;
        counter ++ ;
    }
};
void consumer(){
    while(1){
        while(counter == 0)
        ;
        nextc = buffer [out];
        out = (out+1)%n;
        counter -- ;
        consumer the item in nextc;
        ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然上面的生产者程序和消费者程序在分别看时都是正确的,而且两者在顺序执行时其结果也会是正确的,但若并发执行时就会出现差错,问题就在于这两个进程共享变量counter.生产者对它做加1操作,消费者对它做减1操作,这两个操作在用机器语言实现时,常可用下面的形式描述:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    register1=counter;  register2 = counter ;
    register1=register1+1;  register2=register2-1;
    counter = register1;    counter=register2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设: counter的当前值是5.如果生产者进程先执行左列的三条机器语言语句,然后消费者进程再执行右列的三条语句,则最后共享变量counter的值仍为5: 反之,如果让消费者进程先执行右列的三条语句,然后再让生产者进程执行左列的三条语句, counter值也还是5,但是,如果按下述顺序执行:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    register1=counter;       (register1=5)
    register1=register1+1;   (register1=6)
    register2=counter;       (register2=5)
    register2=register2-1;   (register2=4)
    counter=register1        (counter=6)
    counter=register2        (counter=4)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正确的counter值应当是5,但现在是4,读者可以自己试试,倘若再将两段程序中各语句交叉执行的顺序改变,将可看到又可能得到counter=6的答案,这表明程序的执行已经失去了再现性。为了预防产生这种错误,解决此问题的关键是应把变量counter作为临界资源处理,亦即,令生产者进程和消费者进程互斥地访问变量counter。</p><h4 id="临界区-critical-section" tabindex="-1"><a class="header-anchor" href="#临界区-critical-section" aria-hidden="true">#</a> 临界区(critical section)</h4>`,21),b=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    while(TURE)
    {
        进入区
        临界区
        退出区
        剩余区    
    }
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="同步机制应遵循的规则" tabindex="-1"><a class="header-anchor" href="#同步机制应遵循的规则" aria-hidden="true">#</a> 同步机制应遵循的规则</h4><p>为实现进程互斥地进入自己的临界区,可用软件方法,更多的是在系统中设置专门的同步机构来协调各进程间的运行。所有同步机制都应遵循下述四条准则:</p><ol><li>空闲让进。当无进程处于临界区时,表明临界资源处于空闲状态,应允许一个请求进入临界区的进程立即进入自己的临界区,以有效地利用临界资源。</li><li>忙则等待。当已有进程进入临界区时,表明临界资源正在被访问,因而其它试图进入临界区的进程必须等待,以保证对临界资源的互斥访问。</li><li>有限等待。对要求访问临界资源的进程,应保证在有限时间内能进入自己的临界区,以免陷入“死等”状态。</li><li>让权等待。当进程不能进入自己的临界区时,应立即释放处理机,以免进程陷入“忙等”状态。</li></ol><h3 id="硬件同步机制" tabindex="-1"><a class="header-anchor" href="#硬件同步机制" aria-hidden="true">#</a> 硬件同步机制</h3><p>虽然可以利用软件方法解决诸进程互斥进入临界区的问题,但有一定难度,并且存在很大的局限性,因而现在已很少采用。相应地,目前许多计算机已提供了一些特殊的硬件指令,允许对一个字中的内容进行检测和修正,或者是对两个字的内容进行交换等。可利用这些特殊的指令来解决临界区问题。实际上,在对临界区进行管理时,可以将标志看做一个锁,“锁开”进入,“锁关”等待,初始时锁是打开的。每个要进入临界区的进程必须先对锁进行测试,当锁未开时,则必须等待,直至锁被打开。反之,当锁是打开的时候,则应立即把其锁上,以阻止其它进程进入临界区。显然,为防止多个进程同时测试到锁为打开的情况,测试和关锁操作必须是连续的,不允许分开进行。</p><h4 id="关中断" tabindex="-1"><a class="header-anchor" href="#关中断" aria-hidden="true">#</a> 关中断</h4><p>关中断是实现互斥的最简单的方法之一。在进入锁测试之前关闭中断,直到完成锁测试并上锁之后才能打开中断。这样,进程在临界区执行期间,计算机系统不响应中断,从而不会引发调度,也就不会发生进程或线程切换。由此,保证了对锁的测试和关锁操作的连续性和完整性,有效地保证了互斥。但是,关中断的方法存在许多缺点:</p><ol><li>滥用关中断权力可能导致严重后果;</li><li>关中断时间过长,会影响系统效率,限制了处理器交叉执行程序的能力;</li><li>关中断方法也不适用于多CPU系统,因为在一个处理器上关中断并不能防上进程在其它处理器上执行相同的临界段代码</li></ol><h4 id="利用-test-and-set指令实现互斥" tabindex="-1"><a class="header-anchor" href="#利用-test-and-set指令实现互斥" aria-hidden="true">#</a> 利用 Test-and-Set指令实现互斥</h4><p>这是一种借助一条硬件指令—“测试并建立”指令TS(Test-and-Set)以实现互斥的方法。在许多计算机中都提供了这种指令。TS指令的一般性描述如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>boolean TS(boolean *lock){
    Boolean old;
    old = *lock;
    *lock = TRUE;
    return old;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这条指令可以看作为一个函数过程,其执行过程是不可分割的,即是一条原语。其中,lock有两种状态:</p><ul><li>当lock-FALSE时,表示该资源空闲;</li><li>当lock-TRUE时,表示该资源正在被使用。</li></ul><p>用TS指令管理临界区时,为每个临界资源设置一个布尔变量lock,由于变量lock代表了该资源的状态,故可把它看成一把锁。lock初值为FALSE,表示该临界资源空闲。进程在进入临界区之前,首先用TS指令测试lock,如果其值为FALSE,则表示没有进程在临界区内,可以进入,并将TRUE值赋予lock,这等效于关闭了临界资源,使任何进程都不能进入临界区,否则必须循环测试直到TS(s)为TRUE,利用TS指令实现互斥的循环进程结构可描述如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>do{
    ...
    while TS(&amp;lock);
    critical section;
    locak := FALSE;
    remainder section;
}
while(TRUE);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="利用swap指令实现进程互斥" tabindex="-1"><a class="header-anchor" href="#利用swap指令实现进程互斥" aria-hidden="true">#</a> 利用Swap指令实现进程互斥</h4><p>该指令称为对换指令，在Intel 80x86 中又称为XCHG指令，用于交换两个字的内容。其处理过程描述如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void swap(boolean *a,boolean *b){
    boolean temp;
    temp = *a;
    *a = *b;
    *b = temp;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用对换指令可以简单有效地实现互斥，方法是为每个临界资源设置一个全局的布尔变量lock，其初值为false，在每个进程中再利用一个局部的布尔变量key。利用Swap指令实现进程互斥的循环进程可描述如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>do{
    key = TRUE;
    do{
        swap(&amp;lock,&amp;key);
    }while(key!=FALSE);
    临界区操作;
    lock = FALSE;
    ...
}while(TRUE);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用上述硬件指令能有效的实现进程互斥，但当临界资源忙碌时，其它访问进程必须不断地进行测试，处于一种&quot;忙等&quot;状态，不符合&quot;让权等待&quot;的原则，造成处理机时间的浪费，同时也很难将它们用于解决复杂的进程同步问题。</p><h3 id="信号量机制" tabindex="-1"><a class="header-anchor" href="#信号量机制" aria-hidden="true">#</a> 信号量机制</h3><p>1965年,荷兰学者Dijkstra提出的信号量(Semaphores)机制是一种卓有成效的进程同步工具。在长期且广泛的应用中,信号量机制又得到了很大的发展,它从整型信号量经记录型信号量,进而发展为“信号量集”机制。现在,信号量机制已被广泛地应用于单处理机和多处理机系统以及计算机网络中。</p><h4 id="整型信号量" tabindex="-1"><a class="header-anchor" href="#整型信号量" aria-hidden="true">#</a> 整型信号量</h4><p>最初由Dijkstra把整型信号量定义为一个用于表示资源数目的整型量S,它与一般整型量不同,除初始化外,仅能通过两个标准的原子操作(Atomic Operation) wait(S)和 signal(S)来访问。很长时间以来,这两个操作一直被分别称为P、 V操作. wait和signal操作可描述如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wait(S){
    while (S&lt;=0):/*do no-op*/
    S--;
}
signal(S){
    S++;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>wait(S)和signal(S)是两个原子操作,因此,它们在执行时是不可中断的。亦即,当一个进程在修改某信号量时,没有其它进程可同时对该信号量进行修改。此外,在wait操作中,对S值的测试和做S:=S-1操作时都不可中断。</p><h4 id="记录型信号量" tabindex="-1"><a class="header-anchor" href="#记录型信号量" aria-hidden="true">#</a> 记录型信号量</h4><p>在整型信号量机制中的wait操作,只要是信号量S&lt;=0,就会不断地测试。因此,该机制并未遵循“让权等待”的准则,而是使进程处于“忙等”的状态。记录型信号量机制则是一种不存在“忙等”现象的进程同步机制。但在采取了“让权等待”的策略后,又会出现多个进程等待访问同一临界资源的情况。为此,在信号量机制中,除了需要一个用于代表资源数目的整型变量value外,还应增加一个进程链表指针list,用于链接上述的所有等待进程。记录型信号量是由于它采用了记录型的数据结构而得名的。它所包含的上述两个数据项可描述如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    typedef struct {
        int value;
        struct process_control_block *list:
    }semaphore;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相应地, wait(Ss)和signal(S)操作可描述如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    wait(semaphore *S){
        S-&gt;value--;
        if(S-&gt;value&lt;0) block(S-&gt;list);   
    }
    signal(semaphore *S){
        S-&gt;value++;
        if(S-&gt;value&lt;=0) wakeup(S-&gt;list);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在记录型信号量机制中,S-&gt;value的初值表示系统中某类资源的数目,因而又称为资源信号量,对它的每次wait操作,意味着进程请求一个单位的该类资源,使系统中可供分配的该类资源数减少一个,因此描述为S-&gt;value--;当S.value&lt;0时,表示该类资源已分配完毕,因此进程应调用 block原语进行自我阻塞,放弃处理机,并插入到信号量链表S-&gt;list中。可见,该机制遵循了“让权等待”准则。此时S-&gt;value的绝对值表示在该信号量链表中已阻塞进程的数目。对信号量的每次signal操作表示执行进程释放一个单位资源,使系统中可供分配的该类资源数增加一个,故S-&gt;value++ 操作表示资源数目加1。若加1后仍是S-&gt;value≤0,则表示在该信号量链表中仍有等待该资源的进程被阻塞,故还应调用wakeup原语,将S-&gt;list链表中的第一个等待进程唤醒。如果S-&gt; value的初值为1,表示只允许一个进程访问临界资源,此时的信号量转化为互斥信号量,用于进程互斥</p><h4 id="and型信号量" tabindex="-1"><a class="header-anchor" href="#and型信号量" aria-hidden="true">#</a> AND型信号量</h4><p>前面所述的进程互斥问题针对的是多个并发进程仅共享一个临界资源的情况。在有些应用场合,是一个进程往往需要获得两个或更多的共享资源后方能执行其任务。假定现有两个进程A和B,它们都要求访问共享数据D和E,当然,共享数据都应作为临界资源为此,可为这两个数据分别设置用于互斥的信号量 Dmutex和 Emutex,并令它们的初值都是1。相应地,在两个进程中都要包含两个对 Dmutex和 Emutex 的操作,即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    process A;       process B;
    wait(Dmutex);    wait(Emutex);
    wait(Emutex);    wait(Dmutex);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若进程A和B按下述次序交替执行wait操作</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>process A: wait(Dmutex);  于是 Dmutex=0
process B: wait(Emutex);  于是 Emutex=0
process A: wait(Emutex);  于是 Emutex=1 A阻塞
process B: wait(Dmutex);  于是 Dmutex=-1 B阻塞
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后,进程A和B就将处于僵持状态。在无外力作用下,两者都将无法从僵持状态中解脱出来。我们称此时的进程A和B已进入死锁状态。显然,当进程同时要求的共享资源愈多时,发生进程死锁的可能性也就愈大. AND同步机制的基本思想是:将进程在整个运行过程中需要的所有资源,一次性全部地分配给进程,待进程使用完后再一起释放。只要尚有一个资源未能分配给进程,其它所有可能为之分配的资源也不分配给它。亦即,对若干个临界资源的分配采取原子操作方式:</p><ul><li>要么把它所请求的资源全部分配到进程,要么一个也不分配。</li><li>由死锁理论可知,这样就可避免上述死锁情况的发生。 为此,在wait操作中增加了一个“AND”条件,故称为AND同步，或者称为同时wait操作,即Swait(Simultaneous wait)定义如下：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Swait(S1, S2, .. Sn) {
    while (TRUE){
        if(Si&gt;=1 &amp;&amp; ... &amp;&amp; Sn&gt;=1){
            for(i=1;i&lt;=n;i++)Si--;
            break;
        }
        else{
            place the process in the waiting queue associated with the first Si found with Si&lt;1,and set the program count of this process to the beginning of Swait operation
        }
    }
}

Ssignal(S1,S2,....Sn){
    while(TRUE){
        for(i=1;i&lt;=n;i++){
            Si++;
            Remove all the process waiting in the queue associated with Si into the ready queue.
        }  
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="信号量集" tabindex="-1"><a class="header-anchor" href="#信号量集" aria-hidden="true">#</a> 信号量集</h4><p>在前面所述的记录型信号量机制中, wait(S)或signal(S)操作仅能对信号量施以加1或减1操作,意味着每次只能对某类临界资源进行一个单位的申请或释放。当一次需要N个单位时,便要进行N次wait(S)操作,这显然是低效的,甚至会增加死锁的概率。此外,在有些情况下,为确保系统的安全性,当所申请的资源数量低于某一下限值时,还必须进行管制,不予以分配,因此,当进程申请某类临界资源时,在每次分配之前,都必须测试资源的数量,判断是否大于可分配的下限值,决定是否予以分配。 基于上述两点,可以对AND信号量机制加以扩充,对进程所申请的所有资源以及每类资源不同的资源需求量,在一次P、V原语操作中完成申请或释放。进程对信号量Si的测试值不再是1,而是该资源的分配下限值t,即要求Si≥ti,否则不予分配。一旦允许分配,进程对该资源的需求值为di,即表示资源占用量,进行Si:=Si-di操作,而不是简单的Si=Si-1.由此形成一般化的“信号量集”机制。对应的Swait和Ssignal格式为:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Swait(S1,t1,d1,...,Sn,tn,dn);
Ssignal(S1,d1,...,Sn,dn);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一般“信号量集”还有下面几种特殊情况:</p><ol><li>SwaitS, d, d)。此时在信号量集中只有一个信号量s,但允许它每次申请d个资源,当现有资源数少于d时,不予分配。</li><li>Swait(S, 1. 1),此时的信号量集已蜕化为一般的记录型信号量(S&gt;1时)或互斥信号量(S=1时)。</li><li>Swait(S, 1, 0)。这是一种很特殊且很有用的信号量操作。当S ≥ 1时,允许多个进程进入某特定区:当S变为0后,将阻止任何进程进入特定区。换言之,它相当于一个可控开关.</li></ol><h3 id="信号量的应用" tabindex="-1"><a class="header-anchor" href="#信号量的应用" aria-hidden="true">#</a> 信号量的应用</h3><h4 id="利用信号量实现进程互斥" tabindex="-1"><a class="header-anchor" href="#利用信号量实现进程互斥" aria-hidden="true">#</a> 利用信号量实现进程互斥</h4><p>为使多个进程能互斥地访问某临界资源,只需为该资源设置一互斥信号量 mutex,并设其初始值为1,然后将各进程访问该资源的临界区CS置于wait(mutex)和 signal(mutex)操作之间即可。这样,每个欲访问该临界资源的进程在进入临界区之前,都要先对 mutex 执行 wait 操作,若该资源此刻未被访问,本次 wait 操作必然成功,进程便可进入自己的临界区,这时若再有其它进程也欲进入自己的临界区,由于对 mutex执行wait操作定会失败,因而此时该进程阻塞,从而保证了该临界资源能被互斥地访问。当访问临界资源的进程退出临界区后,又应对 mutex 执行 signal 操作,以便释放该临界资源。利用信号量实现两个进程互斥的描述如下:</p><ol><li>设 mutex为互斥信号量,其初值为1,取值范围为(-1,0,1)。当 mutex=1时,表示两个进程皆未进入需要互斥的临界区;当 mutex=0时,表示有一个进程进入临界区运行,另外一个必须等待,挂入阻塞队列;当 mutex=-1时,表示有一个进程正在临界区运行,另外一个进程因等待而阻塞在信号量队列中,需要被当前已在临界区运行的进程退出时唤醒.</li><li>代码描述:</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    semaphore mutex=1;
    Pa(){                                  
        while(1){
            wait(mutex);
            临界区；
            signal(mutex);
            剩余区;
        }
    }
    Pb(){
        while(1){
            wait(mutex);
            临界区；
            signal(mutex);
            剩余区;
        }
    }
   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在利用信号量机制实现进程互斥时应该注意,wait(mutex)和 signal(muex)必须成对地出现。缺少wait( mutex)将会导致系统混乱,不能保证对临界资源的互斥访问;而缺少signal(mutex)将会使临界资源永远不被释放,从而使因等待该资源而阻塞的进程不能被唤醒.</p><h4 id="利用进程信号量实现前驱关系" tabindex="-1"><a class="header-anchor" href="#利用进程信号量实现前驱关系" aria-hidden="true">#</a> 利用进程信号量实现前驱关系</h4><p>还可以利用信号量来描述程序或语句之间的前驱关系。设有两个并发执行的进程P1和P2.P1中又语句S1；P2中又语句S2.我们希望在S1执行后再执行S2.尉氏县这种前驱关系，只需使进程P1和P2共享一个公用信号量S，并赋予其初值为0，将signal(S)操作放在语句S1后面，而在S2语句前面插入 wait(S)操作,即</p><ul><li>在进程P1中，用 S1; signal(S);</li><li>在进程P2中，用 wait(S); S2;</li></ul><blockquote></blockquote><figure><img src="`+v+`" alt="2-14" tabindex="0" loading="lazy"><figcaption>2-14</figcaption></figure><blockquote></blockquote><p>由于S被初始化为0,这样,若P2先执行必定阻塞,只有在进程P1执行完S1;signal(S);操作后使S增为1时, P2进程方能成功执行语句S2。同样,我们可以利用信号量按照语句间的前趋关系(见图2-14),写出一个更为复杂的可并发执行的程序。图2-14中S1, S2,S3,....S6是最简单的程序段(只有一条语句),为使各程序段能正确执行,应设置若干个初始值为“0”的信号量。如为保证S1→S2, S1→S3的前趋关系,应分别设置信号量 a 和b,同样，为了保证S2→S4,S2→S5,S3→S6,S4→S6和S5→S6,应设置信号量c,d,e,f,g.代码框架描述如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p1(){S1;signal(a);signal(b);}
p2(){wait(a);S2;signal(c);signal(d);}
p3(){wait(b);S3;signal(e);}
p4(){wait(c);S4;signal(f);}
p5(){wait(d);S5;signal(g);}
p6(){wait(e);wait(f);wait(g);S6;}
main(){
    semaphore a,b,c,d,e,f,g;a
    a.value = b.value =c.value = 0;
    a.value =e.value = 0;
    f.value = g.value = 0;
    cobegin
        p1();p2();p3();p4();p5();p6();
    coend
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="管程机制" tabindex="-1"><a class="header-anchor" href="#管程机制" aria-hidden="true">#</a> 管程机制</h3><p>虽然信号量机制是一种既方便、又有效的进程同步机制,但每个要访问临界资源的进程都必须自备同步操作wait(S)和 signal(S)。这就使大量的同步操作分散在各个进程中。这不仅给系统的管理带来了麻烦,而且还会因同步操作的使用不当而导致系统死锁。这样,在解决上述问题的过程中,便产生了一种新的进程同步工具—管程( Monitors)</p><h4 id="管程的定义" tabindex="-1"><a class="header-anchor" href="#管程的定义" aria-hidden="true">#</a> 管程的定义</h4><p>系统中的各种硬件资源和软件资源均可用数据结构抽象地描述其资源特性,即用少量信息和对该资源所执行的操作来表征该资源,而忽略它们的内部结构和实现细节。因此,可以利用共享数据结构抽象地表示系统中的共享资源,并且将对该共享数据结构实施的特定操作定义为一组过程。进程对共享资源的申请、释放和其它操作必须通过这组过程,间接地对共享数据结构实现操作。对于请求访问共享资源的诸多并发进程,可以根据资源的情况接受或阻塞,确保每次仅有一个进程进入管程,执行这组过程,使用共享资源,达到对共享资源所有访问的统一管理,有效地实现进程互斥。 代表共享资源的数据结构以及由对该共享数据结构实施操作的一组过程所组成的资源管理程序共同构成了一个操作系统的资源管理模块,我们称之为管程。管程被请求和释放资源的进程所调用。 Hansan为管程所下的定义是:“个管程定义了一个数据结构和能为并发进程所执行(在该数据结构上)的一组操作,这组操作能同步进程和改变管程中的数据。” 由上述的定义可知,管程由四部分组成:</p><ol><li>管程的名称;</li><li>局部于管程的共享数据结构说明;</li><li>对该数据结构进行操作的一组过程;</li><li>对局部于管程的共享数据设置初始值的语句。</li></ol><ul><li>图2-15是一个管程的示意图。</li></ul><blockquote></blockquote><figure><img src="`+u+`" alt="2-15" tabindex="0" loading="lazy"><figcaption>2-15</figcaption></figure><blockquote></blockquote><ul><li>管程的语法描述如下</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Monitor monitor_name {// 管程名
    share variable declaration; // 共享变量说明
    cond delcarations; // 条件变量说明
    public; // 能被进程调用的过程
    void P1(....)  // 对数据结构操作的过程
    {....}
    void P2(....)
    {....}
    ....
    void(.....){
        .....
    }
    ....
    {                        // 管程主体
        initialization code; // 初始化代码
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上,管程中包含了面向对象的思想,它将表征共享资源的数据结构及其对数据结构操作的一组过程,包括同步机制,都集中并封装在一个对象内部,隐藏了实现细节。封装于管程内部的数据结构仅能被封装于管程内部的过程所访问,任何管程外的过程都不能访问它;反之,封装于管程内部的过程也仅能访问管程内的数据结构。所有进程要访问临界资源时,都只能通过管程间接访问,而管程每次只准许一个进程进入管程,执行管程内的过程,从而实现了进程互后。 管程是一种程序设计语言的结构成分,它和信号量有同等的表达能力,从语言的角度看,管程主要有以下特性:</p><ol><li>模块化,即管程是一个基本程序单位,可以单独编译;</li><li>抽象数据类型,指管程中不仅有数据,而且有对数据的操作;</li><li>信息掩蔽,指管程中的数据结构只能被管程中的过程访问,这些过程也是在管程内部定义的,供管程外的进程调用,而管程中的数据结构以及过程(函数)的具体实现外部不可见。</li></ol><ul><li>管程和进程不同:</li></ul><ol><li>虽然二者都定义了数据结构,但进程定义的是私有数据结构PCB,管程定义的是公共数据结构,如消息队列等;</li><li>二者都存在对各自数据结构上的操作,但进程是由顺序程序执行有关操作,而管程主要是进行同步操作和初始化操作;</li><li>设置进程的目的在于实现系统的并发性,而管程的设置则是解决共享资源的互斥使用问题;</li><li>进程通过调用管程中的过程对共享数据结构实行操作,该过程就如通常的子程序一样被调用,因而管程为被动工作方式,进程则为主动工作方式;</li><li>进程之间能并发执行,而管程则不能与其调用者并发;</li><li>进程具有动态性,由“创建”而诞生,由“撤消”而消亡,而管程则是操作系统中的一个资源管理模块,供进程调用。</li></ol><h4 id="条件变量" tabindex="-1"><a class="header-anchor" href="#条件变量" aria-hidden="true">#</a> 条件变量</h4><p>在利用管程实现进程同步时,必须设置同步工具,如两个同步操作原语wait和signal.当某进程通过管程请求获得临界资源而未能满足时,管程便调用wait原语使该进程等待,并将其排在等待队列上,如图2-13所示。仅当另一进程访间完成并释放该资源之后,管程才又调用signal原语,唤醒等待队列中的队首进程。但是仅仅有上述的同步工具是不够的,考虑一种情况:当一个进程调用了管程,在管程中时被阻塞或挂起,直到阻塞或挂起的原因解除,而在此期间,如果该进程不释放管程,则其它进程无法进入管程,被迫长时间的等待。为了解决这个问题,引入了条件变量condition。通常,一个进程被阻塞或挂起的条件(原因)可有多个,因此在管程中设置了多个条件变量,对这些条件变量的访问只能在管程中进行。管程中对每个条件变量都须予以说明,其形式为: condition x, y;对条件变量的操作仅仅是wait和signal,因此条件变量也是一种抽象数据类型,每个条件变量保存了一个链表,用于记录因该条件变量而阻塞的所有进程,同时提供的两个操作即可表示为x.wait和x.signal,其含义为:</p><ol><li>x.wait: 正在调用管程的进程因x条件需要被阻塞或挂起,则调用x.wait将目己入到x条件的等待队列上,并释放管程,直到 条件变化。此时其它进程可以使用该管程</li><li>x.signal:正在调用管程的进程发现x条件发生了变化,则调用x.signal,重新启动一个因x条件而阻塞或挂起的进程,如果存在多个这样的进程,则选择其中的一个,如果没有,继续执行原进程,而不产生任何结果。这与信号量机制中的signal操作不同。因为,后者总是要执行s:s+1操作,因而总会改变信号量的状态。</li></ol><p>如果有进程Q因x条件处于阻塞状态,当正在调用管程的进程P执行了x.signal操作后,进程Q被重新启动,此时两个进程P和Q,如何确定哪个执行哪个等待,可采用下述两种方式之一进行处理:</p><ol><li>P等待,直至Q离开管程或等待另一条件。</li><li>Q等待,直至P离开管程或等待另一条件。</li></ol><p>采用哪种处理方式,当然是各执一词。Hoare采用了第一种处理方式,而Hansan选择了两者的折中,他规定管程中的过程所执行的signal操作是过程体的最后一个操作,于是,进程P执行signal操作后立即退出管程,因而,进程Q马上被恢复执行。</p>`,82);function p(h,g){const i=c("font");return d(),r("div",null,[m,t("p",null,[e("由前所述可知,不论是硬件临界资源还是软件临界资源,多个进程必须互斥地对它进行访问。"),n(i,{style:{color:"red"}},{default:a(()=>[e("人们把在每个进程中访问临界资源的那段代码称为临界区(critical section)")]),_:1}),e(",显然,若能保证诸进程互斥地进入自己的临界区,便可实现诸进程对临界资源的互斥访问。为此,每个进程在进入临界区之前,应先对欲访问的临界资源进行检查,看它是否正被访问。如果此刻临界资源未被访问,进程便可进入临界区对该资源进行访问,并设置它正被访问的标志:如果此刻该临界资源正被某进程访问,则本进程不能进入临界区。"),n(i,{style:{color:"red"}},{default:a(()=>[e("因此,必须在临界区前面增加一段用于进行上述检查的代码,把这段代码称为进入区(entry section),相应地,在临界区后面也要加上一段称为退出区(exit section)的代码,")]),_:1}),e("用于将临界区正被访问的标志恢复为未被访问的标志。进程中除上述进入区、临界区及退出区之外的其它部分的代码在这里都称为剩余区。这样,可把一个访问临界资源的循环进程描述如下:")]),b])}const S=s(o,[["render",p],["__file","4.html.vue"]]);export{S as default};
