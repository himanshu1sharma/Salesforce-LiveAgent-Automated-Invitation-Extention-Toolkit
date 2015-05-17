//IE 9 fix for console.log
if (!window.console) {var console = {};}
if (!console.log) {console.log = function() {};}

var __liveAgentArray = function(){
	this.arr = [];
}
__liveAgentArray.prototype.addElem = function (liveAgentObject){
	this.arr.push(liveAgentObject);
}
__liveAgentArray.prototype.getById = function (Id){
    for(var i=0 ; i < this.arr.length ; i++) {
        if(this.arr[i].elemId == Id) {
            return this.arr[i];
        }
    }
    return null;
}
__liveAgentArray.prototype.removeListeners = function(liveAgentVarName) {
	for(var i=0 ; i < this.arr.length; i++ ) {
		if(this.arr[i].liveAgentVar == liveAgentVarName ) {
			this.arr[i].destruct();
			this.arr[i] = null;
		}
	}
	this.arr = this.arr.filter(function(n){ return n != undefined });
}
var eventsArray = ['click',
		   'contextmenu',
		   'dblclick',
		   'mousedown',
		   'mouseenter',
		   'mouseleave',
		   'mousemove',
		   'mouseover',
		   'mouseout',
		   'mouseup',
		   'hoverDelay',
		   'hoverDelayStrict'];
var __liveAgentObject = function(element,liveAgentVar,event,delay) {
	this.liveAgentVar = liveAgentVar;
	this.element = element;
	this.elemId = element.getAttribute("liveAgentId") || element.getAttribute("liveagentid");
	this.event = event;
	delay ? this.delay = delay : false;
	if(eventsArray.indexOf(event) != -1) this.addEventListenerFn();
}
__liveAgentObject.prototype.getElement = function() {	
	return this.element;
}
__liveAgentObject.prototype.handlerFn = function(ev) {	
	var la = _lArrayInstance.getById(ev.srcElement.getAttribute("liveAgentId") || ev.srcElement.getAttribute("liveagentid"));
	ev.srcElement.getAttribute("hoverDelayStrict") ? 
		la.addAdditionalHoverStrictListeners(): 
			(ev.srcElement.getAttribute("hoverDelay") ? 
				la.addAdditionalHoverListeners(): 
					_lArrayInstance.getById(ev.srcElement.getAttribute("liveAgentId") || ev.srcElement.getAttribute("liveagentid")).successfulEvent());
};
__liveAgentObject.prototype.successfulEvent = function() {	
	if(typeof liveagent !== "undefined") {
		liveagent.setCustomVariable(this.liveAgentVar,true);
		_lArrayInstance.removeListeners(this.liveAgentVar);	
	} else {
		console.log('Live Agent not Initialised');
	}
}
__liveAgentObject.prototype.addEventListenerFn = function() {
	if((this.event == 'hoverDelayStrict' || this.event == 'hoverDelay') && this.delay) {	
		this.event == 'hoverDelayStrict' ? this.element.setAttribute('hoverDelayStrict',this.delay) : this.element.setAttribute('hoverDelay',this.delay) ;		
		this.event = 'mouseenter';
	}
	this.element.addEventListener(this.event,this.handlerFn,false);
}
__liveAgentObject.prototype.destruct = function() {
	this.element.removeEventListener(this.event, this.handlerFn);
	this.element = null;
	this.elemId = null;
	this.event = null;

}
__liveAgentObject.prototype.addAdditionalHoverListeners = function() {
	if(this.ALDeployed) return;
	this.ALDeployed = true;
	var elem = this.element;
	var IDLE_TIMEOUT = elem.getAttribute("hoverDelay");
	var _idleSecondsCounter = 0;
	elem.addEventListener('mouseleave',mouseoutIntervalFn);
	
	function mouseoutIntervalFn(ev) {
	    _idleSecondsCounter = 0;
	    removeAddListeners(ev.srcElement);
	    clearInterval(timerInterval);
	    _lArrayInstance.getById(ev.srcElement.getAttribute("liveAgentId") || ev.srcElement.getAttribute("liveagentid")).ALDeployed = false;
	};
	function removeAddListeners(elem) {
		elem.removeEventListener('mouseleave',mouseoutIntervalFn);
	}
	var timerInterval = window.setInterval(function(){
		_idleSecondsCounter++;
	    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
	        clearInterval(timerInterval);
	        removeAddListeners(_lArrayInstance.getById(elem.getAttribute("liveAgentId") || elem.getAttribute("liveagentid")).getElement());
	        _lArrayInstance.getById(elem.getAttribute("liveAgentId") || elem.getAttribute("liveagentid")).successfulEvent();
	     }

	}, 1000);
}
__liveAgentObject.prototype.addAdditionalHoverStrictListeners = function(){
	if(this.ALDeployed) return;
	this.ALDeployed = true;
	var elem = this.element;
	var IDLE_TIMEOUT = elem.getAttribute("hoverDelayStrict");
	var _idleSecondsCounter = 0;

	elem.addEventListener('click',clickIntervalFn);
	elem.addEventListener('mousemove',mousemoveIntervalFn);
	elem.addEventListener('keypress',keypressIntervalFn);
	elem.addEventListener('mouseleave',mouseoutIntervalFn);

	function clickIntervalFn() {
	    _idleSecondsCounter = 0;
	};
	function mousemoveIntervalFn() {
	    _idleSecondsCounter = 0;
	};
	function keypressIntervalFn() {
	    _idleSecondsCounter = 0;
	};
	function mouseoutIntervalFn(ev) {
	    _idleSecondsCounter = 0;
	    removeAddListeners(ev.srcElement);
	    clearInterval(timerInterval);
	    _lArrayInstance.getById(ev.srcElement.getAttribute("liveAgentId") || ev.srcElement.getAttribute("liveagentid")).ALDeployed = false;
	};
	function removeAddListeners(elem) {
		elem.removeEventListener('click',clickIntervalFn);
	    elem.removeEventListener('mousemove',mousemoveIntervalFn);
	    elem.removeEventListener('keypress',keypressIntervalFn);
	    elem.removeEventListener('mouseleave',mouseoutIntervalFn);
	}
	
	var timerInterval = window.setInterval(function(){
		_idleSecondsCounter++;
	    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
	        clearInterval(timerInterval);
	        removeAddListeners(_lArrayInstance.getById(elem.getAttribute("liveAgentId") || elem.getAttribute("liveagentid")).getElement());
	     	_lArrayInstance.getById(elem.getAttribute("liveAgentId") || elem.getAttribute("liveagentid")).successfulEvent();
	     }

	}, 1000);
}

_lArrayInstance = new __liveAgentArray();
var __oldOnLoad = window.onload

window.onload = function() {    
	if(__oldOnLoad) __oldOnLoad();
    var elemArray = document.querySelectorAll('[sfLiveAgent]');
    for(var elem = 0 ; elem < elemArray.length ; elem ++ ) {    
    	elemArray[elem].setAttribute('liveAgentId','LATK' + elem);
    	var attrValue = elemArray[elem].getAttribute("sfLiveAgent");
    	if(attrValue && attrValue.split(',')[0] && attrValue.split(',')[1]) {
	    	if(attrValue.split(',')[2])
	    		_lArrayInstance.addElem(new __liveAgentObject(elemArray[elem],
							attrValue.split(',')[0],
								attrValue.split(',')[1],
									attrValue.split(',')[2]));
	    	else
	    		_lArrayInstance.addElem(new __liveAgentObject(elemArray[elem],
	   						attrValue.split(',')[0],
	   							attrValue.split(',')[1]));
    	}
    }
}
