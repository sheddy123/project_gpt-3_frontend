export const codeSnippets = {
  cpp: `#include <iostream>
#include <string>

std::string Solution()
{
    std::string x = "Hello world!";
    return x;
}

int main()
{
    std::cout << Solution() << std::endl;
    return 0;
}`,
  c: `#include <stdio.h>
#include <string.h>

const char* Solution()
{
    const char* x = "Hello world!";
    return x;
}

int main()
{
    printf("%s", Solution());
    return 0;
}`,
  php: `<?php
function Solution() {
    $x = "Hello world!";
    return $x;
}
echo Solution();
?>`,
  python: `def main():
    print(Solution())

def Solution():
    x = "Hello world!"
    return x

if __name__ == "__main__":
    main()
`,
  javascript: `function Solution() {
    var x = "Hello world!";
    return x;
}

console.log(Solution());
`,
  node: `function Solution() {
    var x = "Hello world!";
    return x;
}

console.log(Solution());
`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println(Solution());
    }

    public static String Solution() {
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
            Debug.WriteLine(Solution());
        }
        //Do not comment this out. 
        public static string Solution()
        {
            string x = "Hello world!";
            return x;
        }
    }
}`,
};
