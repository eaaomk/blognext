import{_ as t}from"./2-5-fa5713b7.js";import{_ as n,V as r,W as s,X as l,Y as i,$ as o,a0 as a,Z as c,F as d}from"./framework-bcbeea85.js";const u="/blognext/images/2-6.png",p="/blognext/images/2-78.png",C="/blognext/images/2-9.png",P="/blognext/images/2-11.png",h="/blognext/images/2-12.png",B={},g=l("h1",{id:"进程的描述",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#进程的描述","aria-hidden":"true"},"#"),i(" 进程的描述")],-1),f=l("h3",{id:"进程的定义与特征",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#进程的定义与特征","aria-hidden":"true"},"#"),i(" 进程的定义与特征")],-1),_=l("ul",null,[l("li",null,"进程的定义")],-1),b=l("p",null,"在多道程序环境下,程序的执行属于并发执行,此时它们将失去其封闭性,并具有间断性,以及其运行结果不可再现性的特征。由此,决定了通常的程序是不能参与并发执行的,否则,程序的运行也就失去了意义。为了能使程序并发执行,并且可以对并发执行的程序加以描述和控制,人们引入了“进程”的概念。为了使参与并发执行的每个程序(含数据)都能独立地运行,在操作系统中必须为之配置一个专门的数据结构,称为",-1),m=l("strong",null,"系统利用PCB来描述进程的基本情况和活动过程,进而控制和管理进程。这样,由程序段、相关的数据段和PCB三部分便构成了进程实体(又称进程映像)。一般情况下,我们把进程实体就简称为进程。",-1),x=c('<p>对于进程的定义,从不同的角度可以有不同的定义,其中较典型的定义有:</p><ol><li>进程是程序的一次执行。</li><li>进程是一个程序及其数据在处理机上顺序执行时所发生的活动。</li><li>进程是具有独立功能的程序在一个数据集合上运行的过程,它是系统进行资源分配和调度的一个独立单位。</li></ol><p>在引入了进程实体的概念后,我们可以把传统OS中的进程定义为: “进程是进程实体的运行过程,是系统进行资源分配和调度的一个独立单位。”</p><ul><li>进程的特征</li></ul><p>进程和程序是两个截然不同的概念,除了进程具有程序所没有的PCB结构外,还具有下面一些特征:</p><ol><li>动态性。进程的实质是进程实体的执行过程,因此,动态性就是进程的最基本的特征。动态性还表现在: “它由创建而产生,由调度而执行,由撤消而消亡。”可见,进程实体有一定的生命期,而程序则只是一组有序指令的集合,并存放于某种介质上,其本身并不具有活动的含义,因而是静态的。</li><li>并发性。是指多个进程实体同存于内存中,且能在一段时间内同时运行。引入进程的目的也正是为了使其进程实体能和其它进程实体并发执行。因此,并发性是进程的另一重要特征,同时也成为os的重要特征。而程序(没有建立PCB)是不能参与并发执行的。</li><li>独立性。在传统的OS中,独立性是指进程实体是一个能独立运行、独立获得资源和独立接受调度的基本单位。凡未建立PCB的程序都不能作为一个独立的单位参与运行。</li><li>异步性,是指进程是按异步方式运行的,即按各自独立的、不可预知的速度向前推进。正是源于此因,才导致了传统意义上的程序若参与并发执行,会产生其结果的不可再现性。为使进程在并发运行时虽具有异步性,但仍能保证进程并发执行的结果是可再现的,在OS中引进了进程的概念,并且配置相应的进程同步机制。</li></ol><h3 id="进程的基本状态及转换" tabindex="-1"><a class="header-anchor" href="#进程的基本状态及转换" aria-hidden="true">#</a> 进程的基本状态及转换</h3><ul><li>进程的3种基本状态</li></ul><p>进程的三种基本状态由于多个进程在并发执行时共享系统资源,致使它们在运行过程中呈现间断性的运行规律,所以进程在其生命周期内可能具有多种状态。一般而言,每一个进程至少应处于以下三种基本状态之一:</p><ol><li>就绪(Ready)状态。这是指进程已处于准备好运行的状态,即进程已分配到除CPU以外的所有必要资源后,只要再获得CPU,便可立即执行。如果系统中有许多处于就绪状态的进程,通常将它们按一定的策略(如优先级策略)排成一个队列,称该队列为就绪队列</li><li>执行(Running)状态。这是指进程已获得CPU,其程序正在执行的状态。对任何个时刻而言,在单处理机系统中,只有一个进程处于执行状态,而在多处理机系统中,则有多个进程处于执行状态。</li><li>阻塞(Block）状态。这是指正在执行的进程由于发生某事件(如O请求、申请缓冲区失败等)暂时无法继续执行时的状态,亦即进程的执行受到阻塞。此时引起进程调度,Os把处理机分配给另一个就绪进程,而让受阻进程处于暂停状态,一般将这种暂停状态称为阻塞状态,有时也称为等待状态或封锁状态。通常系统将处于阻塞状态的进程也排成一个队列,称该队列为阻塞队列。实际上,在较大的系统中,为了减少队列操作的开销,提高系统效率,根据阻塞原因的不同,会设置多个阻塞队列。</li></ol><ul><li>3种基本状态的转换 进程在运行过程中会经常发生状态的转换。例如，处于就绪状态的进程，在调度程序为之分配了处理机之后便可执行,相应地,其状态就由就绪态转变为执行态;正在执行的进程(当前进程)如果因分配给它的时间片已完而被剥夺处理机暂停执行时,其状态便由执行转为就绪:如果因发生某事件,致使当前进程的执行受阻(例如进程访问某临界资源,而该资源正被其它进程访问时),使之无法继续执行,则该进程状态将由执行转变为阻塞。图2-5示出了进程的三种基本状态,以及各状态之间的转换关系。</li></ul><blockquote></blockquote><figure><img src="'+t+'" alt="2-5" tabindex="0" loading="lazy"><figcaption>2-5</figcaption></figure><ul><li>创建状态和终止状态</li></ul><p>为了满足进程控制块对数据及操作的完整性要求以及增强管理的灵活性,通常在系统中又为进程引入了两种常见的状态:创建状态和终止状态</p><ol><li>创建状态如前所述,进程是由创建而产生。创建一个进程是个很复杂的过程,一般要通过多个步骤才能完成:如首先由进程申请一个空白PCB,并向PCB中填写用于控制和管理进程的信息然后为该进程分配运行时所必须的资源:最后,把该进程转入就绪状态并插入就绪队列之中。但如果进程所需的资源尚不能得到满足,比如系统尚无足够的内存使进程无法装入其中,此时创建工作尚未完成,进程不能被调度运行,于是把此时进程所处的状态称为创建状态引入创建状态是为了保证进程的调度必须在创建工作完成后进行,以确保对进程控制块操作的完整性。同时,创建状态的引入也増加了管理的灵活性,OS可以根据系统性能或主存容量的限制推迟新进程的提交(创建状态)。对于处于创建状态的进程,当其获得了所需的资源以及对其PCB的初始化工作完成后,便可由创建状态转入就绪状态</li><li>终止状态进程的终止也要通过两个步骤:首先,是等待操作系统进行善后处理,最后将其PCB清零,并将PCB空间返还系统。当一个进程到达了自然结束点,或是出现了无法克服的错误,或是被操作系统所终结,或是被其他有终止权的进程所终结,它将进入终止状态。进入终止态的进程以后不能再执行,但在操作系统中依然来留一个记录,其中保存状态码和一些计时统计数据,供其他进程收集。一旦其他进程完成了对其信息的提取之后,操作系统将删除该进程,即将其PCB清零,并将该空白PCB返还系统。图2-6示出了增加了创建状态和终止状态后进程的五种状态及转换关系图。</li></ol><blockquote></blockquote><figure><img src="'+u+'" alt="2-6" tabindex="0" loading="lazy"><figcaption>2-6</figcaption></figure><h3 id="挂起操作和进程状态的转换" tabindex="-1"><a class="header-anchor" href="#挂起操作和进程状态的转换" aria-hidden="true">#</a> 挂起操作和进程状态的转换</h3><p>在许多系统中,进程除了就绪、执行和阻塞三种最基本的状态外,为了系统和用户观察和分析进程的需要,还引入了一个对进程的重要操作--挂起操作。当该操作作用于某个进程时,该进程将被挂起,意味着此时该进程处于静止状态。如果进程正在执行,它将暂停执行。若原本处于就绪状态,则该进程此时暂不接受调度。与挂起操作对应的操作是激活操作。</p><ul><li>挂起操作的引入</li></ul><p>引入挂起操作的原因,是基于系统和用户的如下需要:</p><ol><li>终端用户的需要。当终端用户在自己的程序运行期间发现有可疑问题,希望暂停自己的程序的运行,使之停止下来,以便用户研究其执行情况或对程序进行修改。</li><li>父进程请求。有时父进程希望挂起自己的某个子进程,以便考查和修改该子进程,或者协调各子进程间的活动。</li><li>负荷调节的需要。当实时系统中的工作负荷较重,已可能影响到对实时任务的控制时,可由系统把一些不重要的进程挂起,以保证系统能正常运行。</li><li>操作系统的需要。操作系统有时希望挂起某些进程,以便检查运行中的资源使用情况或进行记账。</li></ol><ul><li>引入挂起原语操作后三个进程状态的转换</li></ul><p>在引入挂起原语Suspend和激活原语Active后,在它们的作用下,进程将可能发生以下几种状态的转换:</p><ol><li>活动就绪一静止就绪。当进程处于未被挂起的就绪状态时,称此为活动就绪状态,表示为Readya,此时进程可以接受调度。当用挂起原语Suspend将该进程挂起后,该进程便转变为静止就绪状态,表示为Readys,处于Readys状态的进程不再被调度执行。</li><li>活动阻塞一静止阻塞。当进程处于未被挂起的阻塞状态时,称它是处于活动阻塞状态,表示为Blockeda,当用Suspend原语将它挂起后,进程便转变为静止阻塞状态,表示为Blockeds。处于该状态的进程在其所期待的事件出现后,它将从静止阻塞变为静止就绪Readys状态</li><li>静止就绪一活动就绪。处于Readys状态的进程若用激活原语Active激活后,该进程将转变为Readya状态。</li><li>静止阻塞一活动阻塞。处于Blockeds状态的进程若用激活原语Active激活后,进程将转变为Blockeda状态。图2-7示出了具有挂起状态的进程状态图。</li></ol><ul><li>引入挂起操作后五个进程状态的转换</li></ul><blockquote></blockquote><figure><img src="'+p+'" alt="2-78" tabindex="0" loading="lazy"><figcaption>2-78</figcaption></figure><p>如图2-8示出了增加了创建状态和终止状态后具有挂起状态的进程状态及转换图。 如图2-8所示,引进创建和终止状态后,在进程状态转换时,与图2-7所示的进程五状态转换相比较,要增加考虑下面的几种情况:</p><ol><li>NULL→创建:一个新进程产生时,该进程处于创建状态。</li><li>创建→活动就绪:在当前系统的性能和内存的容量均允许的情况下,完成对进程创建的必要操作后,相应的系统进程将进程的状态转换为活动就绪状态。</li><li>创建→静止就绪:考虑到系统当前资源状况和性能的要求,不分配给新建进程所需资源,主要是主存,相应的系统将进程状态转为静止就绪状态,被安置在外存,不参与调度,此时进程创建工作尚未完成</li><li>执行→终止:当一个进程己完成任务时,或是出现了无法克服的错误,或是被OS或是被其他进程所终结,此时将进程的状态转换为终止状态。</li></ol><h3 id="进程管理中的数据结构" tabindex="-1"><a class="header-anchor" href="#进程管理中的数据结构" aria-hidden="true">#</a> 进程管理中的数据结构</h3><p>如上所述,一方面,为了便于对计算机中的各类资源(包括硬件和信息)的使用和管理, Os将它们抽象为相应的各种数据结构,以及提供一组对资源进行操作的命令,用户可利用这些数据结构及操作命令来执行相关的操作,而无需关心其实现的具体细节。另一方面,操作系统作为计算机资源的管理者,尤其是为了协调诸多用户对系统中共享资源的使用,它还必须记录和查询各种资源的使用及各类进程运行情况的信息。Os对于这些信息的组织和维护也是通过建立和维护各种数据结构的方式来实现的。</p><h4 id="操作系统中用于管理控制的数据结构" tabindex="-1"><a class="header-anchor" href="#操作系统中用于管理控制的数据结构" aria-hidden="true">#</a> 操作系统中用于管理控制的数据结构</h4><p>在计算机系统中,对于每个资源和每个进程都设置了一个数据结构,用于表征其实体,我们称之为资源信息表或进程信息表,其中包含了资源或进程的标识、描述、状态等信息以及一批指针。通过这些指针,可以将同类资源或进程的信息表,或者同一进程所占用的资源信息表分类链接成不同的队列,便于操作系统进行查找。如图2-9所示, os管理的这些数据结构一般分为以下四类:内存表、设备表、文件表和用于进程管理的进程表,通常进程表又被称为进程控制块PCB.本节着重介绍PCB,其它的表将在后面的章节中陆续介绍。</p><blockquote></blockquote><figure><img src="'+C+'" alt="2-9" tabindex="0" loading="lazy"><figcaption>2-9</figcaption></figure><h4 id="进程控制块pcb的作用" tabindex="-1"><a class="header-anchor" href="#进程控制块pcb的作用" aria-hidden="true">#</a> 进程控制块PCB的作用</h4><p>为了便于系统描述和管理进程的运行,在Os的核心为每个进程专门定义了一个数据结构--进程控制块PCB(Process Control Block),. PCB作为进程实体的一部分,记录了操作系统所需的,用于描述进程的当前情况以及管理进程运行的全部信息,是操作系统中最重要的记录型数据结构。PCB的作用是使一个在多道程序环境下不能独立运行的程序(含数据)成为一个能独立运行的基本单位,一个能与其他进程并发执行的进程。下面对FCB的具体作用作进一步的闸述;</p><ol><li>作为独立运行基本单位的标志。当一个程序(含数据)配置了PCB后,就表示它已是一个能在多道程序环境下独立运行的、合法的基本单位,也就具有取得Os服务的权利,如打开文件系统中的文件,请求获得系统中的IO设备,以及与其它相关进程进行通信等。因此,当系统创建一个新进程时,就为它建立了一个PCB,进程结束时又回收其PCB,进程于是也随之消亡。系统是通过PCB感知进程的存在的。事实上, PCB已成为进程存在于系统中的唯一标志。</li><li>能实现间断性运行方式。在多道程序环境下,程序是采用停停走走间断性的运行方式运行的。当进程因阻塞而暂停运行时,它必须保留自己运行时的CPU现场信息,再次被调度运行时,还需要恢复其CPU现场信息。在有了PCB后,系统就可将CPU现场信息保存在被中断进程的PCB中,供该进程再次被调度执行时恢复CPU现场时使用。由此,可再次明确,在多道程序环境下,作为传统意义上的静态程序,因其并不具有保护或保存自己运行现场的手段,无法保证其运行结果的可再现性,从而失去运行的意义。</li><li>提供进程管理所需要的信息。当调度程序调度到某进程运行时,只能根据该进程PCB中记录的程序和数据在内存或外存中的始址指针,找到相应的程序和数据;在进程运行过程中,当需要访问文件系统中的文件或1O设备时,也都需要借助于PCB中的信息。 另外,还可根据PCB中的资源清单了解到该进程所需的全部资源等。可见,在进程的整个生命期中,操作系统总是根据PCB实施对进程的控制和管理。</li><li>提供进程调度所需要的信息。只有处于就绪状态的进程才能被调度执行,而在PCB中就提供了进程处于何种状态的信息。如果进程处于就绪状态,系统便将它插入到进程就绪队列中,等待着调度程序的调度;另外在进行调度时往往还需要了解进程的其他信息,如在优先级调度算法中,就需要知道进程的优先级。在有些较为公平的调度算法中,还需要知道进程的等待时间和己执行的时间等。</li><li>实现与其它进程的同步与通信。进程同步机制是用于实现诸进程的协调运行的,在采用信号量机制时,它要求在每个进程中都设置有相应的用于同步的信号量。在PCB中还具有用于实现进程通信的区域或通信队列指针等。</li></ol><h4 id="进程控制块中的信息" tabindex="-1"><a class="header-anchor" href="#进程控制块中的信息" aria-hidden="true">#</a> 进程控制块中的信息</h4><p>在进程控制块中,主要包括下述四个方面的信息。</p><ul><li>进程标识符</li></ul><p>进程标识符用于唯一地标识一个进程。一个进程通常有两种标识符:</p><ol><li>外部标识符。为了方便用户(进程)对进程的访问,须为每一个进程设置一个外部标识符。它是由创建者提供的,通常由字母、数字组成。为了描述进程的家族关系,还应设置父进程标识及子进程标识。此外,还可设置用户标识,以指示拥有该进程的用户。</li><li>内部标识符。为了方便系统对进程的使用,在OS中又为进程设置了内部标识符即赋予每一个进程一个唯一的数字标识符,它通常是一个进程的序号。</li></ol><ul><li>处理机状态</li></ul><p>处理机状态信息也称为处理机的上下文,主要是由处理机的各种寄存器中的内容组成的。这些寄存器包括:</p><ol><li>通用寄存器,又称为用户可视寄存器,它们是用户程序可以访问的,用于暂存信息,在大多数处理机中,有8~32个通用寄存器,在RISC结构的计算机中可超过100个;</li><li>指令计数器,其中存放了要访问的下一条指令的地址;</li><li>程序状态字PSW,其中含有状态信息,如条件码、执行方式、中断屏蔽标志等;</li><li>用户栈指针指每个用户进程都有一个或若干个与之相关的系统栈,用于存放过程和系统调用参数及调用地址。栈指针指向该栈的栈顶。处理机处于执行状态时,正在处理的许多信息都是放在寄存器中。当进程被切换时,处理机状态信息都必须保存在相应的PCB中,以便在该进程重新执行时能再从断点继续执行。</li></ol><ul><li>进程调度信息</li></ul><p>在OS进行调度时,必须了解进程的状态及有关进程调度的信息,这些信息包括:</p><ol><li>进程状态,指明进程的当前状态,它是作为进程调度和对换时的依据:</li><li>进程优先级,是用于描述进程使用处理机的优先级别的一个整数,优先级高的进程应优先获得处理机;</li><li>进程调度所需的其它信息,它们与所采用的进程调度算法有关,比如,进程已等待CPU的时间总和、进程已执行的时间总和等:</li><li>事件,是指进程由执行状态转变为阻塞状态所等待发生的事件,即阻塞原因</li></ol><ul><li>进程控制信息</li></ul><p>是指用于进程控制所必须的信息,它包括:</p><ol><li>程序和数据的地址,进程实体中的程序和数据的内存或外存地(首)址,以便再调度到该进程执行时,能从PCB中找到其程序和数据;</li><li>进程同步和通信机制,这是实现进程同步和进程通信时必需的机制,如消息队列指针、信号量等,它们可能全部或部分地放在PCB中:</li><li>资源清单,在该清单中列出了进程在运行期间所需的全部资源(除CPU以外),另外还有一张已分配到该进程的资源的清单;</li><li>链接指针,它给出了本进程(PCB)所在队列中的下一个进程的PCB的首地址</li></ol><h4 id="进程控制块的组织方式" tabindex="-1"><a class="header-anchor" href="#进程控制块的组织方式" aria-hidden="true">#</a> 进程控制块的组织方式</h4><p>在一个系统中,通常可拥有数十个、数百个乃至数千个PCB。为了能对它们加以有效的管理,应该用适当的方式将这些PCB组织起来。目前常用的组织方式有以下三种。</p><ol><li>线性方式,即将系统中所有的PCB都组织在一张线性表中,将该表的首址存放在内存的一个专用区域中。该方式实现简单、开销小,但每次查找时都需要扫描整张表,因此适合进程数目不多的系统。图2-10示出了线性表的PCB组织方式</li><li>链接方式,即把具有相同状态进程的PCB分别通过PCB中的链接字链接成一个队列。这样,可以形成就绪队列、若干个阻塞队列和空白队列等。对就绪队列而言,往往按进程的优先级将PCB从高到低进行排列,将优先级高的进程PCB排在队列的前面。同样,也可把处于阻塞状态进程的PCB根据其阻塞原因的不同,排成多个阻塞队列,如等待I/O操作完成的队列和等待分配内存的队列。图2-11展示出了一种链接队列的组织方式。</li></ol><blockquote></blockquote><figure><img src="'+P+'" alt="2-11" tabindex="0" loading="lazy"><figcaption>2-11</figcaption></figure><ol start="3"><li>索引方式,即系统根据所有进程状态的不同,建立几张索引表,例如,就绪索引表、阻塞索引表等,并把各索引表在内存的首地址记录在内存的一些专用单元中。在每个索引表的表目中,记录具有相应状态的某个PCB在PCB表中的地址。图2-12示出了索引方式的PCB组织。</li></ol><blockquote></blockquote><figure><img src="'+h+'" alt="2-12" tabindex="0" loading="lazy"><figcaption>2-12</figcaption></figure>',62);function k(O,y){const e=d("font");return r(),s("div",null,[g,l("ul",null,[l("li",null,[i("对程序的执行不理解的读者请移步阅读"),o(e,{style:{color:"red"}},{default:a(()=>[i("前趋图与程序的执行")]),_:1}),i("，这是一个非常重要的基础知识。")])]),f,_,b,o(e,{style:{color:"red"}},{default:a(()=>[i("进程控制块(Process Control Block, PCB)")]),_:1}),i(", "),m,i(" 例如,所谓创建进程,实质上是创建进程实体中的PCB;而撤消进程,实质上是撤消进程的PCB。"),x])}const U=n(B,[["render",k],["__file","2.html.vue"]]);export{U as default};
