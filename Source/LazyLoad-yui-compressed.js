/*
---
description:     LazyLoad

authors:
  - David Walsh (http://davidwalsh.name)

license:
  - MIT-style license

requires:
  core/1.2.1:   '*'

provides:
  - LazyLoad
...
*/
var LazyLoad=new Class({Implements:[Options,Events],options:{range:200,image:"blank.gif",resetDimensions:true,elements:"img",container:window,fireScroll:true},initialize:function(a){this.setOptions(a);this.container=document.id(this.options.container);this.elements=$$(this.options.elements);this.containerHeight=this.container.getSize().y;this.start=0;this.elements=this.elements.filter(function(c){if(c.getPosition(this.container).y>this.containerHeight+this.options.range){c.store("oSRC",c.get("src")).set("src",this.options.image);if(this.options.resetDimensions){c.store("oWidth",c.get("width")).store("oHeight",c.get("height")).set({width:"",height:""});}return true;}},this);var b=function(){var c=this.container.getScroll().y;if(c>this.start){this.elements=this.elements.filter(function(d){if((this.container.getScroll().y+this.options.range+this.containerHeight)>=d.getPosition(this.container).y){if(d.retrieve("oSRC")){d.set("src",d.retrieve("oSRC"));}if(this.options.resetDimensions){d.set({width:d.retrieve("oWidth"),height:d.retrieve("oHeight")});}this.fireEvent("load",[d]);return false;}return true;},this);this.start=c;}this.fireEvent("scroll");if(!this.elements.length){this.container.removeEvent("scroll",b);this.fireEvent("complete");}}.bind(this);this.container.addEvent("scroll",b);if(this.options.fireScroll){this.container.fireEvent("scroll");}}});