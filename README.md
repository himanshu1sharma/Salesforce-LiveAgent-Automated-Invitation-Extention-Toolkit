# Salesforce LiveAgent Automated Invitation Extention Toolkit

This toolkit can be used to add custom rules on DOM elements to extend the capabilities of salesforce live agent automated invitations. 

It works on the principle of setting a custom variable on an automated invitation rule to true and show the chat. This can be used to show multiple invitation on a single page bound to different DOM Element. It is optimised to remove all event listeners when the chat has been triggered for better performance.

The chat can be prompted by the following events on DOM elements : 

Custom Events : 

  1. hoverDelay : When the mouse is over an element for a specified period of time. 
  
  2. hoverDelayStrict : When the mouse is over an element for a specified period of time with no other user activity. 
  
Standard events : 
  
  3. click : Mouse click on the DOM element.
  
  4. contextmenu : Mouse right-click(or left:-)) on the DOM element.
  
  5. dblclick : Mouse double click on the DOM Element
  
  6. mousedown : Mouse button pressed won on the DOM element
  
  7. mouseup : When the mouse button is released on the DOM element.
  
  8. mouseenter : When the mouse enters the DOM element.
  
  9. mouseleave : when the mouse leaves the DOM element.
  
  10. mousemove : When the mouse moves over a DOM element. 
  
  11. mouseover : When the mouse is over a DOM Element.
  
  12. mouseout : When the mouse pointer is moved out of an element, or out of one of its children.
  
# Usage : 

Create an automated invitation by setting one of the criteria of the sending rule to use a custom variable when the value is true. 

Ex : Configure a custom variable 'ShowChat' for the value true. 

Standard events: 

You need to specify a acustom attribute to the element which accepts 2 (or 3 parameters in case of hoverDelay and hoverDelayStrict, see below). 

Param1 : The name of the variable used in the criteria of the sending rule. 
Param2 : The event on which the chat should be started

```html
<p id='liveAgentTkDiv' sfLiveAgent="ShowChat,click"> Clicking on this text would prompt live agent chat</p>
```
Custom events : 

To use hover delay and hover delay strict you need to pass 3 params to the attribute : 

Param1 : The name of the variable used in the criteria of the sending rule. 
Param2 : The event on which the chat should be started (hoverDelay or hoverDelayStrict)
Param3 : The time delay(in seconds) after which the chat should be prompted.

```html
<p id='liveAgentTkDiv' sfLiveAgent="ShowChat,hoverDelay,5"> keep mouse on this text for 5 seconds to prompt live agent chat</p>
```

Note : When a chat has been prompted for an invitation, all the event listeners are removed for that chat variable.

# Use Cases

This toolkit can be used for a variety of use cases, some of which can be : 

1. To calculate idle time on the page and prompt chat. 
2. Route to different invitations based on the user's click. 
3. Prompt chat by detecting the user trying to leave the page or if they are looking at the contact details section.
and more...

Does this fit your use case? if not, email me at himanshu.sharma@makepositive.com for feature requests.
