# Valid.js
## A small javascript input validation class.

### Constructor:

```var valid = new Valid(valueToCheck [, valueLabel]);```

### Methods:

#### Check valid email address:
```valid.isEmail(); // Returns true or false```

#### Check valid hostname (levels is integer number of domains levels. For example google.com has 2 levels, where google has one; value of 0 does no level check):

```
valid.isHostname([numSegments]); // Returns true or false
                                 // Takes number of hostname segments as optional argument (default: 0)
                                 // 0 segments performs no segment check
```

#### Check valid IPv4 address:
```valid.isIPv4(); // Returns true or false```

#### Validate length
```
valid.isLength(lengthMin [, lengthMax]) // Returns true or false, also sets valid.message
                                        // with error message, uses valid.valueLabel
```

#### Validate password
```
/**
*
* Default password requirement settings can be made in class constructor or set with setters.
*
* Password validation requirement values:
* 
* 2 = No requirements (only length)
* 4 = Require only numbers
* 8 = Require only letters
* 16 = Require letters and numbers
* 32 = Require letters and numbers and at least one uppercase letter
* 64 = Require letters and numbers, at least one uppercase letter,
*       and at least one symbol (default)
* 
**/
```

#### Password validation setters:
```
valid.setPassReq(64); // Sets to strongest requirement
valid.setPassLen(8); // Minimum password length of 8 characters
```
#### Execute password validation method:
```
valid.valPass(); // returns true or false, also sets valid.message
                 //with error message, uses valid.valueLabel
```

#### Validate integer string
```
valid.isInt(); // Returns true or false
```

#### Validate integer range
```
valid.isRange(low, high); // Returns true or false. Low is >= operator and high is <=.
```
