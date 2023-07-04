export const codeSnippets = {
  cpp: `#include <iostream>
#include <string>

std::string Foo()
{
    std::string x = "Hello world!";
    return x;
}

int main()
{
    std::cout << Foo() << std::endl;
    return 0;
}`,
  c: `#include <stdio.h>
#include <string.h>

const char* Foo()
{
    const char* x = "Hello world!";
    return x;
}

int main()
{
    printf("%s", Foo());
    return 0;
}`,
  php: `<?php
function foo() {
    $x = "Hello world!";
    return $x;
}
echo foo();
?>`,
  python: `def main():
    print(foo())

def foo():
    x = "Hello world!"
    return x

if __name__ == "__main__":
    main()
`,
  javascript: `function foo() {
    var x = "Hello world!";
    return x;
}

console.log(foo());
`,
  node: `function foo() {
    var x = "Hello world!";
    return x;
}

console.log(foo());
`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println(foo());
    }

    public static String foo() {
        String x = "Hello world!";
        return x;
    }
}`,
  csharp: `using System.Diagnostics;
namespace DemoTest{
    public class Program
    {
        public static void Main(string[] args)
        {
            Debug.WriteLine(Foo());
        }

        public static string Foo()
        {
            string x = "Hello world!";
            return x;
        }
    }
}`,
};
