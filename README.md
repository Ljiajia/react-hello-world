# React学习 - hello world

## 1. 前言
随着移动互联网时代的到来，Web前端的工作由以前的PC端扩展到了多终端、页面的交互需求也越来越复杂。前端处理问题的本质是获取服务端或用户输入数据，然后高效地呈现到页面上。来自Facebook的React框架正是完全面向此问题的一个解决方案，按官网描述，其出发点为：用于开发数据不断变化的大型应用程序（Building large applications with data that changes over time）^[1]。

本文第2、3、4章先通过一个简单的例子， 先介绍React的开发环境、生命周期等实际概念，在第5章记录下了我在开发React项目中所踩到的坑以及解决方案，第6章记录个人使用React的一些总结与心得，希望可以帮助你快速进入React的世界。

### 1.1 React
React是最近非常流行的一个JavsScript框架，用于创建可重用的高性能现代UI组件。它使得组件的开发、维护和重用都非常方便。React采用了一个托管虚拟DOM结构，将传统需要由开发者完成的DOM更新操作，改进为自动更新。
您只需声明性地指定 Web UI 组件分层结构，并将它提供给 React 的虚拟 DOM（采用了Diff算法）。然后 React 负责在合适的时机同步您的数据到浏览器的实际 DOM。
![](http://7xlcmt.com1.z0.glb.clouddn.com/15-9-13/56417704.jpg)

### 1.2. 必备知识
阅读本文之前，我认为你已经知道：

+  `node.js` & `npm`包的安装与使用
+ `CommonJS` 和 `AMD` 规范

## 2. 环境搭建
 此处我们选择webpack来构建React, 关于webpack的内容，请参看[此处](http://webpack.github.io/docs/)。强烈建议你通过[petehunt](https://github.com/petehunt)这篇入门教程（[webpack howto](https://github.com/petehunt/webpack-howto)）学习webpack的使用，[中文翻译](http://www.h-simon.com/?p=99)参看此处。
 
#### 2.1 安装webpack 和 webpack-dev-server
webpack用于分析、编译和打包囊括React在内的JavaScript、CSS、图片，同时还支持编译Jade、Less、 Sass、CoffeeScript等需预处理语言。
webpack-dev-server 会根据webpack的配置运行一个开发服务器，并实时编译你的代码。

> npm install -g webpack
> npm install -g webpack-dev-server

#### 2.2 下载
你可以从[此处](https://github.com/shenlm203/react-hello-world)下载到本文示例源码。

#### 2.3 安装依赖包
安装webpack的用于解析页面 js、jsx、css、image 等的loader或plugins。
在下载项目的根目录执行npm 安装命令。
> npm install

*请一定记得执行此步骤，否则会报错。*
#### 2.4 运行
执行以下代码，开启webpack开发服务器，并访问：`http://localhost:8080` 即可查看示例。
>  webpack-dev-server --progress --colors

#### 2. 5 打包发布
 通过webpack 执行打包发布,在示例根目录运行命令：
> webpack -p

## 3. 我的第一个实例
我们来实现如下一个[hello world](http://runjs.cn/code/omm9oaez)小例子： 用户在一个input中输入自己的名字，用户输入实时展现在页面上。 当用户点击确定的时候，触发表单提交事件，页面弹出alert 提示 hello + 用户输入的姓名。
你只需要在按上一章中给出的步骤搭建好示例环境，并运行，就可以在本地访问了。
![](/media/14420822926041.jpg)

### 3.1 关键代码如下

#### 3.1.1 HTML

```html
...
<body>
	<div id="holder"></div>
	<script type="text/javascript" src="vendor.bundle.js" charset="utf-8"></script>
	<script type="text/javascript" src="index.bundle.js" charset="utf-8"></script>
</body>
...
```

#### 3.1.2 CSS or Less
```css

body {
    margin: 0;
    padding: 0;
}
.page {
    width: 1024px;
    margin: 20px auto;
}
button {
    border: 0;
    background: #ff7755;
    color: #fff;
    margin-left: 10px;
}
input {
    border: 1px solid #ccc;
}

```
#### 3.1.3 JS

```javascript
'use strict';

require('./style.css');

var App = React.createClass({
    getDefaultProps: function () {
        return {
            hint: 'you have input'
        }
    },
    getInitialState: function () {
        return {
            name: 'world'
        }
    },
    handleSubmit: function (ev) {
        alert('hello, ' + this.state.name + '!');
        ev.preventDefault();
    },
    handleFieldChange: function (ev) {
        var val = ev.target.value;

        this.setState({
            name: val
        });
    },
    render: function () {

        return <div className="page">
            <form action="" onSubmit={this.handleSubmit}>
                <label>你的名字：</label>
                <input ref="nameField"
                       type="text"
                       onChange={this.handleFieldChange}
                       defaultValue={this.state.name}/>
                <button type="submit">submit</button>
            </form>

            <div className="container">
                <span>{this.props.hint}</span>
                <strong>{this.state.name}</strong>
            </div>
        </div>
    }
});
//渲染组件到页面
React.render(<App hint="您已输入:" />, document.getElementById('holder'));
```

这部分代码可能看起来很长，其实它包含的内容很少。首先是将以前写在页面HTML语言改成JSX写在了JS中，而HTML中就只需要保留装载这个组件的容器`div#holder`。
除了render函数，剩余的最主要的操作就是处理input内容**onChange**事件、表单提交事件。可以看到，代码真是少得可怜。这也就是虚拟DOM的优势，开发者不需要考虑传统的DOM查找、修改等操作。只需要关心与自身组件相关的业务逻辑即可。

### 3.2 代码思路
现在我们来看看示例中JS代码的逻辑。
#### 3.2.1 设置属性和状态值
首先，我们通过getDefaultProps()函数设置了一个属性：`hint`，用与在页面中提示用户输入。
其次，我们通过getInitialState()函数设置了一个状态：`name`, 这个值将一直实时更新到页面中。

#### 3.2.2 渲染
首先我们编写`render()`函数，此函数返回一段JSX格式代码。我们暂时可将JSX看作是一种新的模板语法，在render函数中，我们将初始设置的 `hint` 和 `name`，并写入JSX代码中，然后通过类似HTML绑定事件的方法，绑定了2个事件：onChange 和 onSubmit。

#### 3.2.3 获取和更新数据
在本例中，我们通过onChange事件的`ev.target`获取当前用户的输入。此处的onChange事件，经过了React的处理，用户在键盘上的任何输入，都可以即时反馈出来，而不像原生onChange，需要blur或者enter键按下时才能触发。
要更新页面上的数据，只需要执行简单的setState方法即可，此例中，我们将获取的用户输入的name，实时更新页面提示中。其他的都不用考虑，就一个字，爽。

## 4 生命周期(lifecycle)
最开始接触React的声明周期的时候，我比较困惑，觉得这个东西很玄奥。其命名冗长，比如组件加载完毕，要写成componentDidMount，这也是最初我对React产生畏难情绪的一个重要因素。但是当真正理解了生命周期之后，其实其内容非常简单。
举个简单的例子，之前我们在处理ajax的时候，会需要在start beforeSend success complete等时机处理不同的操作。组件的生命周期就是类似Ajax的这些状态回调，用来处理组件各个状态的变化。它可以满足开发者变态的控制欲，组件的任何状态和任何改变都可以被获取并给出处理，这是想想就让人兴奋的事儿。React给了我们一个组件的构造框架，我们可以用它开创造符合我们业务需求的各类组件。

为了方便理解生命周期的概念，我们在上例中调用补全每个生命周期的API函数，输出当前的生命周期名称到控制台。
针对刚才的例子，查看[示例](http://runjs.cn/code/zqt6xobt)(通过console查看当前运行生命周期)，代码如下：

```javascript
getDefaultProps: function () {
    console.log('getDefaultProps');
    //...
},
getInitialState: function () {
    console.log('getInitialState');
    //...
},
componentWillMount: function () {
    console.log('componentWillMount');
},
componentDidMount: function () {
    console.log('componentDidMount');
},
componentWillReceiveProps: function () {
    console.log('componentWillReceiveProps');
},
shouldComponentUpdate: function () {
    console.log('shouldComponentUpdate');
    return true;
},
componentWillUpdate: function () {
    console.log('componentWillUpdate');
},
componentDidUpdate: function () {
    console.log('componentDidUpdate');
},
componentWillUnmount: function () {
    console.log('componentWillUnmount');
},
handleSubmit: function (ev) {
    console.log('handleSubmit');
   //...
},
handleFieldChange: function (ev) {
    console.log('onChange');
    //...
},
render: function () {
    console.log('render');
    //...
}
```

**页面渲染完毕，周期执行顺序：**
![](/media/14417168518030.jpg)
**在我们输入name的时候，执行`setState()`， 周期执行顺序：**
![](/media/14417168783730.jpg)
注：`onChange`是输出的事件名

## 5. 踩到的坑

### 5.1 JSX
JSX是一个类XML的`ECMAScript`语法扩展^([[4](http://facebook.github.io/jsx/)]),它设计初衷并不是为了要应用在引擎或浏览器中。JSX试图借助某些预处理器（preprocessors）将其转换成标准的ECMAScript语法Token。它和已经被禁用的E4X有些类似，但JSX只是与E4X的语法有部分重叠，与E4X完全没有关系。

与传统模板引擎相比，JSX借助预处理器，可以减少极大的模板引擎的语法噪音（syntax noise）。以至于JSX让HTML可以对于程序员来说，可以植入到js中，使得我们不用再频繁地去做HTML字符串拼接。
我们甚至可以在js中写如下代码：

```javascript
var index =1;
var html = <p>paragraph{index}</p>;
```

这儿还容易才到的坑是： React在定义和使用组件名的时候，需要使用首字母大写的驼峰命名。在JSX语法中，首字母小写的标签会当做是HTML的原生标签，如果首字母大写，JSX当做React的组件并试图去解析它。所以在刚开始接触React的时候，命名一不小心就会踩坑。

**例如：**

```javascript
var Cpn = React.crateClass({...}); //此处如果定义为cpn, 则程序出错
React.render(<Cpn /> , document.body);
```

### 5.2 默认属性
组件内部的默认属性可以被渲染时传入的参数更新，类似于常用的参数合并, `$.exted(defaults, options)`。

**例如：**

```javascript
var App = React.create({
	//...
	getDefaultProps: function(){
		return {
			hint: 'hello'
		}
	}
	//...
})

React.render(<App hint={'您好'}, document.body);  //App渲染时默认的hint属性值为您好

```

### 5.3 props & state
刚开始接触React的时候，有可能被这两个内容搞懵。

property: 用于保存组件的属性
state： 用于保存组件用于展现的内部状态
比如，我们要实现一个tab组件，那么tab中标题，以及内容可以写进属性。当前激活的tab索引可以记录为状态。

```javascript
props: {
	tabs:[{
		title: 'tab1',
		content: 'tab1 content'
	},{
		title: 'tab2',
		content: 'tab2 content'
	}]
}
state: {
	current: 1
}
```

### 5.4 强行写入html代码
由于业务的多样性，总是避免不了要往页面中置入一段HTML片段的场景。比如，我们从数据库中得到了一段Web Editor编辑的代码，想要通过React 渲染到页面上。React出于安全考虑，会将变量中传入的HTML代码转义。如果要传递HTML代码，则必须确定数据来源安全，然后使用`dangerouslySetInnerHTML`。

**例如：**

```javascript
//...
render: function () {
	var htmlSnippet = '<p>editor content</p>'
		
	//错误
	return <article>{htmlSnippet}</article>; //输出带有左右尖括号的：'<p>editor content</p>'
	//正确
	return <article dangerouslySetInnerHTML={{__html: htmlSnippet}} />; // 输出：editor content
}
//...

```

### 5.5 componentDidMount 处理Ajax
React是一套界面处理框架，本身不带Ajax功能。我们的业务逻辑中如果要出力Ajax， 需要借助另外的框架（或原生JS）。
比如，我们有这么一个需求：页面在加载完成的时候，从后端获得一个统计数据，并展示在页面上，示例猛戳[此处](http://runjs.cn/code/6ah1zvn5)。

**传统的方案是：**
页面加载、ajax发起请求、数据拼接得到HTML片段，更新页面DOM。

```javascript
	$.ajax({
		//...
		success: function (rs){
			$('.container').append('<span>' + rs.total + '</span>')
		}
	})
```

**React方案：**
采用React，为了保证组件间解耦，通常是在组件加载完成之后再由组件自身发起请求。由于组件渲染是实时的，因会有组件的白屏时间过长的风险，故不会等到异步的Ajax完毕之后再操作。React通常采用的方案是，先渲染组件进页面，再通过setState更新。这时就用到了生命周期中的`componentDidMount()`判断组件渲染完毕了。

因此我们处理上面的问题步骤是：页面加载、React组件渲染，Ajax请求数据、更新数据

```javascript
var App = React.createClass({
	//...
	componentDidMount: function(){
		//ajax success
		success: function(rs){
			this.setState({
				total: rs.total
			})
		}
	},
	render: function(){
		return <p>统计数据：<span>{this.state.total}</span></p>;
	});
```

### 5.6 setState的时间问题
``setState(data, callback)``是通知react数据更新的常用方法。初次使用，我们通常会直接使用`setState()`传入第一个参数`data`，却忽略掉其提供API中的`callback`回调函数。导致我们在调用此函数之后，试图立即获取state更新后的值，但在这个时候程序达不到预期。

**例如：**

```javascript

var total;

// 当前 this.state.total = 3;

this.setState({
	total:  100
}, function(){
	//正确
	total = this.state.total;  // 已更新 total = 100
})

//错误
var total = this.state.total; // 未更新 total = 3 
```
究其原因，`setState()`方法会将当前传入的`data`值merge到`this.state`上，然后重新渲染(re-render)组件, 当组件渲染完成之后，可选参数`callback`会被调用，用于进一步的操作。整个过程在React中是一个等待回调过程，如果在`setState()`函数调用之后，立即获取state值，则会得到更新之前的值。

### 5.7 render 的return必须是单个节点
`render()` 函数中返回的JSX，必须是单个节点，而不可是一个节点列表。否则JSX编译时会报错：

![](/media/14419418912524.jpg)

比如：

```javascript
// ...
render: function(){
	// 错误
	return <p>
                paragraph1
            </p>
            < p >
                paragraph2
            </p>；
		
	//正确
	return <div className="wrapper">
            <p>
                paragraph1
            </p>

            < p >
                paragraph2
            </p>
        </div>;
}
//...
```

## 6 结束语

### 6.1 React的优劣势

**优势**

+ React学习起来非常简单，如果你有一定的前端功底，那么花上一小段儿时间就可以轻易上手。
+ 创新的组件构建和复用模式使得在使用React开发网站的时候，可以轻易分层构建复杂组件、降低网站开发的复杂度和提升可维护性。
+ 与其他前端库完美兼容，如jQuery、Kissy、backbone等。但是你会发现，有了React，DOM操作已经不需要借助框架了。
+ 增加产品的产品的健壮性，降低前端的时间和开发成本。

**劣势**
+ SEO效果不理想

### 6.2 React的浏览器支持
React几乎支持所有当前主流的非IE浏览器。 支持IE8+，IE8需要使用[Polyfills](http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills)。
### 6.3 思考

React为前端开发和维护带来了一片新的天地，其在企业级和移动端项目开发上具有很大优势。随着React Native的推出，更是将React代码连接到原生Android 或 IOS平台，发展空间巨大。

React拥有强大的UI组件创建和复用能力，同时其社区已拥有大量可重用的组件，再借助NPM包管理，这将构建一套属于React的全新的的组件生态系统。
与传统的jQuery框架及其各自为政的第三方插件系统不同，React生态系统中的组件更强调协作和高度重用，劣质的组件会被淘汰，优秀的组件被甄别出来之后，可以成为其他更优秀上层组件的基石。通过这种不断的积累，会使得前端开发质量和效率越来越高、封装性越来越强、专业领域越来越集中。
它使得以前分散的个人前端力量现在可以凝聚到一起，组件的创新可以被积累和放大，最后会让前端组件化成为势不可挡的潮流。

庆幸我们处在一个变革、积极进取的时代...



# 参考文献

1. [颠覆式前端UI开发框架：React](http://www.infoq.com/cn/articles/subversion-front-end-ui-development-framework-react/)
2. [React：创建可维护、高性能的 UI 组件](http://www.ibm.com/developerworks/cn/web/wa-react-intro/index.html)
3. [React中文网](http://reactjs.cn/)
4.  [JSX说明文档](http://facebook.github.io/jsx/)
5. [React Diff 算法](http://segmentfault.com/a/1190000000606216)




