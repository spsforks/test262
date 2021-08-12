// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: If x is equal to +Infinity, Math.sqrt(x) is +Infinity
es5id: 15.8.2.17_A5
description: Checking if Math.sqrt(+Infinity) is +Infinity
---*/

assert.sameValue(Math.sqrt(+Infinity), +Infinity, 'Math.sqrt(+Infinity) must return +Infinity');
