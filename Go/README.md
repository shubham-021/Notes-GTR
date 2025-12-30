## Pickup Learnings

- ```go mod init <module path>```
    - initialized a go.mod file
    - Describes the module: with name/module path and go version used in the program

- In Go , everything is organized into packages (all our code must belong to a package)
- In Go, every source file must start with a package declaration. Think of a package as a folder or a container that groups related code together.
    - add ```package main``` on top of the file
- The reason package main is special—and necessary—is that it tells the Go compiler: 
    - This is not just a library 
    - This is a program that should be turned into an executable file.

- Go needs to know where does it start executing its code , which line to start from , so we have to do everything in main fn

- Everything comes from a package , any helper function , like print , that comes from fmt package
    - Go programs are organized into packages
    - Go's standard library, provides different core packages for us to use
    - "fmt" is one of these , which you can use by importing it
    - checkout all packages on official documentation

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello world")
}
```

- In Go, there are two types of packages:
    - Library Packages: These are collections of code intended to be reused by other programs (like package fmt or package math). They don't run on their own.
    - The Main Package: This is the entry point. When you run go build, the compiler looks specifically for package main to know where the "start" button is. 

## Variables and Constants 

```go
var camelCase = "something"

// instead of declaring and assigning value as above we can also do the same as

camelCase := "something"
```

---

### var variableName = "something" VS variableName := "something"

- var variableName = "something" (The Standard Declaration)
    - This is the formal way to declare a variable.
    - Scope: Can be used anywhere (inside a function or at the "package level" outside functions).
    - Type Inference: Since you assigned a value, Go knows it is a string. However, you could also be explicit: var variableName string = "something".
    - Zero Values: This is the only way to declare a variable without giving it a value immediately (e.g., var name string), which defaults to an empty string "".

- name := "something" (The Short Declaration)
    - This is the shorthand (or "Walrus operator") way to declare and initialize.
    - Scope: Can only be used inside a function (func). Using this at the top of your file (package level) will cause a compilation error.
    - Implicit: It declares the variable, detects the type, and assigns the value all in one motion.
    - Redeclaration: It is often used to quickly grab multiple return values from a function, like val, err := someFunction().

- When to use which?
    - Use := whenever possible inside functions. It makes the code cleaner, shorter, and easier to read. Most Go developers use this for 90% of their local variables.
    - Use var when:
        - You need a Global/Package-level variable (outside func main).
        - You want to declare a variable now but assign it later (e.g., inside an if block).
        - You want to be very specific about the type (e.g., var price float64 = 10 instead of the default int).

---

- Go compile Error to enforce better code quality
    - Variable names must be used
    - Imported packages must be used

```go
var name = "Shubham"
fmt.Println("My name is",name)
```

- we have "const" which creates a varible which can not be modified again

```go
const name = "Shubham"
name = "Singh" // will generate error

fmt.Println(name)
```

- Print formatted data
    - it takes a template string that contains the text that needs to be formatted
    - Plus some annotation verbs(or placeholder) that tells that fmt functions how to format that variable passed in
```go
        fmt.Printf("Some text with a variavle %s",myVariable) // checkout various placeholder on the official documentation

        // Printing types:

        var name = "Shubham"
        var age = 23

        fmt.Printf("name is %T, age is %T",name,age) // %T is placeholder for type of the variable
```

---

## Data Types and Pointers

- Go is a statically typed language
    - You need to tell Go Compiler, the data type when declaring the variable

- Type Inference: But , Go can infer the type when you assign a value

```go
var userName // will generate error, since value is not assigned therefore go can not infer the data type , so you have to mention data type explicitly
userName = "Shubham"

fmt.Println(userName)


// correct way

var userName string
userName = "Shubham"

fmt.Println(userName)


// Pointers
var name = "Shubham"

fmt.Println(name) // will print the value stored in the container name
fmt.Println(&name) // will print the memory address of container name


// Taking user input

var name string
fmt.Println("Enter your first name: ")
fmt.Scan(name) // wrong , how have to provide it a memory location

fmt.Scan(&name) // correct way
```

---

## Array and Slices

``` var variableName = [array_size]data_type{values} ```

```go
var names = [50]string{"Shubham","Nana"}

// we can define empty like this
var names = [50]string{} 
//or
var name [50]string


fmt.Printf("The whole array: %v\n", names)
fmt.Printf("The first value: %v\n", names[0])
fmt.Printf("Array type: %T\n", names)
fmt.Printf("Array length: %v\n", len(names))
```

- What if we dont know the size of an array when creating it
- A list that is more dynamic in size

- Slice
    - Slice is an abstraction of an Array
    - Slices are more flexible and powerful: variable-length or get and sub-array of its own
    - Slice are also index-based and have a size , but is resized when needed

- append method:
    - adds the element(s) at the end of the slice
    - Grows the slice if a greater capacity is needed and returns the updated slice value

```go
var names[] string
// var names = []string{}
// names := []string{}

var firstName = "Shubham"
var lastName = "Sing"

append(names, firstName + " " + lastName)

fmt.Printf("The whole slice: %v\n", names)
fmt.Printf("The first value: %v\n", names[0])
fmt.Printf("Slice type: %T\n", names)
fmt.Printf("Slice length: %v\n", len(names))
```

---

## Loops

- only one loop 'for loop' with different types , no while, do while loops

- simple for loop

```go
for {

}
```

- for each loop

    - lets say we have list of full names and we want first names from the names stored

    ```go
    fullNames := []string{}
    fullNames = append(fullNames,"Shubham Singh")
    fullNames = append(fullNames,"Motu Tiwari")
    fullNames = append(fullNames,"Chhapri Patel")

    firstNames := []string{}

    // for index,variable := range list

    for _,fullName := range fullNames {
        var names = strings.Fields(fullName)
        firstNames = append(firstNames,names[0])
    }

    fmt.Printf("The first names are: %v\n",firstNames)
    ```

    - To iterate over slice here , we used range
    - Range iterates over elements for different data structures (so not only array and slices)
    - For arrays and slices , range provides the index and value for each element

    - strings.Fields()
    - Splits the string with white spaces as separator
    - and returns a slice with the split elements
    - string "Shubham Singh" --> slice ["Shubham","Singh"]

    - we used underscore in place of index , since for us index was of no use
    - underscore is known as Blank identifier
    - To ignore a variable you dont want to use
    - So with Go you need to make unused variables explicit

---

## Conditional Statements 

```go
var i = 0
// var forLoopShouldStopHere bool = i == 10
// and use it in the if condition or we can do direct comparision there too

// forLoopShouldStopHere := i==10

for{
    if i == 10 {
        fmt.Println("Forloop ends here")
        break
    }
} 
```

- same syntax as others language
- break
- continue

- Conditionals in For Loop

```go
var size = 10
var i =0

for  i <= size {

}

for true {

}
// same as

for {

}
```

---

## Checkings

- len()
    - Built-in function returning length of variable accroding to its type
    - Arrays & slices : Size of the list 
    - Strings : The number of characters

- strings.Contains(variable_name,"what we need to check for")
    - checks if the variable contains the second arg

---

## Switch Statements

- Allows a variable to be tested for equality against a list of values

```go
    city := "London"

    switch city {
        case "New York:
            // code for the case
        case "Singapore":
            // code for the case
        case "Mexico":
            // code for the case
        case "London","Berlin":
            // code for the case
        default:
            fmt.Println("No valid city selected")
    }
```

---

## Package level variables

- When some variable is being used by many functions it doesnt make sense to define or pass them function to function , again and again , it would be userful if we can declare them once and use anywhere they are needed
- Define them as package level variables

- Package level variables are defined at the top outside all functions
- They must be declared using `var`

---

## Packages in Go

- Scope: Package level
    - Variables and Functions defined outside any function, can be accessed in all other files within the same package

- if we are using different files for the same package , we can not run the package only doing ```go run main.go``` 
- we have to provide all the files associated with the package , like if we have two file main.go and helper.go , we need to run ```go run main.go helper.go```

- we can not provide all the file names to run the package if we had many
- instead we can give the current files location to run those , ```go run .```

### Multiple packages

- different package files should be seperated in different folders
- to export any function, variable in Go , just Capitalize its first letter
- to import we cant just state the package name is the import list , we have to import wrt to module-name , like , booking-app/helper

### Scope 

- 3 level of scope
    - Local
        - Declaration within function : Can be used only within that function
        - Declaration within block : Can be used only within that block
    - Package
        - Declaration outside all function : Can be used everywhere in the same package
    - Global
        - Declaration outside all functions & uppercase first letter : Can be used everywhere across all packages

- Variable Scope : Scope is the region of a program , where a defined variable can be accessed

---

## Maps

```go
var variableName = make(map[key_data_type]value_data_type)
```

- make ??

## Struct Data Type

```go
struct {
    firstName string
    lastName string
    email string
    age uint
}
```

### "type" statement - Custom types

- The type keyword creates a new type , with the name you specify
- In fact , you could also create a type based on every other data type like int,string,etc.

```go
type UserDate struct {
    firstName string
    lastName string
    email string
    age uint
}
```

---

## Concurrency

- Go Routines
    - "go" keyword
        - "go ..." starts a new go routine
        - A go routine is a lightweight thread managed by the Go runtime

- Synchronizing Go routines
    - main thread doesnt wait for other threads to complete , it terminates as soon as it completed its job
    - we need to tell the main thread about other running threads
    - Waitgroup
        - Waits for the launched go routines to finish
        - Package "sync" provides basic synchronization
        - Add: Sets the number of go routines to wait for (increases the counter by the provided number)
        - Wait: Blocks until the WaitGroup counter is 0
        - Done: Decrements the WaitGroup counter by 1 , so this is called by the go routine to indicate that its finished

    ```go
        var wg = sync.WaitGroup{}

        // above the go routines
        wg.Add(1) // 1 is the number of routines to wait for

        // add this at the end of main thread function
        wg.Wait()

        // add this inside the routine function at the end
        wg.Done()
    ```

---

# What GO does different or better than other languages ?
- Go is using , Whats called "Green Thread"
- Abstraction of actual thread
- Managed by the go routine , we are only interacting with these high level go routines
- Cheaper and lighter
- You can run hundreds of thousands or millions go routines without affecting the performance
- Channels: Built in functionality for go routines to talk to each other

- OS threads
    - managed by kernels
    - are hardware dependent
    - cost of these threads are higher
    - higher start up time
    - No easy commincation between threads

# Important Points

- A Go function can return multiple values
