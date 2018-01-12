function timeout(ms){
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,ms,'done')
	})
}
timeout(100).then((value)=>{
	console.log(value)
})

function loadImageAsync(url){
	return new Promise((resolve,reject)=>{
		const image=new Image();
		image.onload=function(){
			resolve(image)
		};
		image.onerror=function(){
			reject(new Error('can nott load image at '+url))
		}
		image.src=url
	})
}

const getJSON=function(url){
	const promise=new Promise((resolve,reject)=>{
		const handle=function(){
			if(this.readyState!==4){
				return
			}
			if(this.status>=200||this.status===304){
				resolve(this.responseText)
			}else{
				reject(new Error(this.statusText))
			}
		}
		const client=new XMLHttpRequest();
		client.open("GET",url);
		client.onreadystatechange=handle;
		client.responseType="json";
		client.setRequstHeader("Accept","application/json");
		client.send();
	})
}

getJSON("/post/1.json").then(function(){
	return getJSON(post.commentURL);
}).then(function funcA(comments){
	console.log("resolved", comments);
},function funcB(err){
	console.log("rejected", err)
})

getJSON("/post/1.json").then(
	post=>getJSON(post.commentURL)
).then(
	comments=>{console.log("resolved", comments)},
	err=>{console.log("err",err)}
)

someAsyncThing().then(function(){
	return someOtherAsyncThing();
}).catch(function(error){
	console.log("oh, no",error);
	y+2
})catch(function(error){
	console.log("oh, no",error);
})

const promises=[2,3,4,5,6].map(function(id){
	return getJSON('/post/'+id+".json");
})
Promise.all(promises).then(function(posts){

}).catch(function(){

})

var PENDING=0;
var FULFILLED=1;
var REJECTED=2;

function Promise(callback){
	this.status=PENDING;
	this.value=null;//状态执行成功事件的入参
	this.defferd=[];//保存状态改变之后的需要处理的函数以及promise子节点
	setTimeout(callback.bind(this,this.resolve.bind(this),this.reject.bind(this)),0);
}
Promise.prototype={
	constructor:Promise,
	resolve:function(result){
		this.status=FULFILLED;
		this.value=result;
		this.done();
	},
	reject:function(error){
		this.status=REJECTED;
		this.value=error;
	}
	handle:function(fn){
		if(!fn){
			return
		}
		var value=this.value;
		vat t=this.status;
		var p;
		if(t===PENDING){
			this.defferd.push(fn);
		}else{
			if(t==FULFILLED&&typeof fn.onfulfield=='function'){
				p=fn.onfulfield(value);
			}
			if(t==REJECTED && typeof fn.onrejected=='function'){
				p=fn.onrejected(value);
			}
			var promise=fn.promise;
			if(promise){
				if(p&&p.constructor==Promise){
					p.defferd=promise.defferd;
				}else{
					p=this;
					p.defferd=promise.defferd;
					this.done();
				}
			}
		}
	},
	done:function(){
		var status=this.status;
		if(status==PENDING){
			return
		}
		var defferd=this.defferd
		for(var i=0;i<defferd.length;i++){
			this.handle(defferd[i])
		}
	},
	then:function(success,fail){
		var o={
			onfulfield:success,
			onrejected:fail
		},
		var status=this.status;
		o.Promise=new this.constructor(function(){

		});
		if(status==PENDING){
			this.defferd.push(o);
		}else if(status==FULFILLED||status==REJECTED){
			this.handle(o)
		}
		return o.promise
	}
}