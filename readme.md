1. Difference between getElementById, getElementsByClassName, querySelector, querySelectorAll
= getElementById() selects a single element using its unique id and returns only one element.
getElementsByClassName() selects all elements with a specific class name and returns a live HTMLCollection.
querySelector() returns the first element that matches a given CSS selector.
querySelectorAll() returns all matching elements as a NodeList using CSS selectors.

2. How do you create and insert a new element into the DOM?
= Use document.createElement() to create a new element. Then use appendChild() or append() to insert it into a parent element.

3. What is Event Bubbling?
= Event Bubbling is when an event starts from the target element and moves up to its parent elements.


4. What is Event Delegation? Why is it useful?
= Event Delegation is adding an event listener to a parent element to handle child elements using event bubbling. It is useful beacause it improves performance and works for dynamically added elements.

5. Difference between preventDefault() and stopPropagation()
= preventDefault() stops the browser’s default action and 
stopPropagation() stops the event from bubbling to parent elements.