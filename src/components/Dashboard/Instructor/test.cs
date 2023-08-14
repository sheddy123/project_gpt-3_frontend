        import java.net.*;

        class networking 

        {

            public static void main(String[] args) throws Exception 

            {

                URL obj = new URL("https://www.sanfoundry.com/javamcq");

                URLConnection obj1 = obj.openConnection();

                int len = obj1.getContentLength();

                System.out.print(len);

            }

        }