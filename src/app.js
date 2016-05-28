// Crawlers will run on separate thread
//  - read yet to be viewed profile
//  - read shortlisted profile with categories
//  - read full profile and update
//  
//  
import { Web } from "./web";
import { Spider } from "./spider";

var w = new Web ("http://www.tamilmatrimony.com");
var s = new Spider (w, {});

s.run ();
