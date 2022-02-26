let PriorityQueue = (function() {
   const q = new WeakMap();

   class QueueElement {
      constructor(element, priority){
        this.element = element;
        this.priority = priority;
      }
   }

   return class Queue {
      constructor(){
        q.set(this, []);
      }

      enqueue (elem, priority){
   
        let queueElement = new QueueElement(elem, priority);
        let added = false;

        for(let i = 0; i< q.get(this).length; i ++){
          if(queueElement.priority < q.get(this)[i].priority){
             q.get(this).splice(i, 0, queueElement);
             added = true;
             break;
          }
        }

        if(!added){
          q.get(this).push(queueElement);         
        }
        

      }

      dequeue (){
        return q.get(this).shift();
      }

      front (){
        return q.get(this)[0];
      }

      isEmpty (){
        return q.get(this).length === 0;
      }

      size (){
        return q.get(this).length;
      }

      toString(){
        return q.get(this);
      }

   }
})()

var q = new PriorityQueue();

q.enqueue('zs', 1);
q.enqueue('ls', 5);
q.enqueue('ww', 2);
q.enqueue('zl', 3);
console.log(q.toString());


