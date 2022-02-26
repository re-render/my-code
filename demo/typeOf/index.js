function myTypeof (value){

   return typeof value === 'object' ? {
     '[object Object]' : 'Object',
     '[object Array]' : 'Array',
     '[object Boolean]' : 'Boolean',
     '[object String]' : 'String',
     '[object Number]' : 'Number'
   }[({}).toString.call(value)]     :  typeof value;

}