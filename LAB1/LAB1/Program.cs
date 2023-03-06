namespace LAB1;

using System.Net;
using System.Net.Sockets;
using System.Text;

public class Message
{
    public DateTime Time { get; set; }
    public string SenderName { get; set; }
    public string Text { get; set; }

    public Message(DateTime time, string name, string text)
    {
        Time = time;
        SenderName = name;
        Text = text;
    }
}

public static class Program
{
    public static void CHECK(object TOCHECK)
    {
        var tmp = ((Func<bool>)TOCHECK)();

        if (tmp)
            while (true)
                Console.WriteLine("FATAL");
    }


    public static async Task<int> Main()
    {
        var sentMessageNeedBackPing = false;
        var getMessageNeedToSendPing = false;
        var FATAL = false;

        var tm = new TimerCallback(CHECK);
        var timer = new Timer(tm, new Func<bool>(() => sentMessageNeedBackPing), 0, 5000);

        var acceptedMessages = new List<Message>();
        var sentMessages = new List<Message>();

        var localAddress = IPAddress.Parse("127.0.0.1");
        var username = "";

        Console.Write("Username: ");
        username = Console.ReadLine();

        Console.Write("Port for incoming messages: ");
        if (!int.TryParse(Console.ReadLine(), out var localPort)) return 0;

        Console.Write("Port for sending messages: ");
        if (!int.TryParse(Console.ReadLine(), out var remotePort)) return 0;

        Console.WriteLine();

        Task.Run(ReceiveMessageAsync); // get messages in real-time

        await SendMessageAsync(); // send messages in real-time

        async Task SendConfirmationMessage()
        {
            using var sender = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            var message = "SUCCESS";
            var data = Encoding.UTF8.GetBytes(message);
            // и отправляем на 127.0.0.1:remotePort
            await sender.SendToAsync(data, SocketFlags.None, new IPEndPoint(localAddress, remotePort));
        }

        async Task SendMessageAsync()
        {
            using var sender = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);

            Console.WriteLine("Enter message: ");
            while (true)
            {
                var message = Console.ReadLine();

                if (string.IsNullOrWhiteSpace(message)) break;

                sentMessages.Add(new Message(DateTime.Now, username, message));

                message = $"|{DateTime.Now}|#{username}#%{message}%";
                var data = Encoding.UTF8.GetBytes(message);

                await sender.SendToAsync(data, SocketFlags.None, new IPEndPoint(localAddress, remotePort));

                Console.Clear();

                foreach (var item in acceptedMessages)
                {
                    Console.Write("\t\t\t\t\t\t\t");
                    Console.WriteLine($"{item.SenderName}: {item.Text}");
                }

                foreach (var item in sentMessages) Console.WriteLine($"You: {item.Text}");

                sentMessageNeedBackPing = true;
            }
        }

        async Task ReceiveMessageAsync()
        {
            var data = new byte[65535];

            using var
                receiver = new Socket(AddressFamily.InterNetwork, SocketType.Dgram,
                    ProtocolType.Udp); // socket for listening

            receiver.Bind(new IPEndPoint(localAddress, localPort));
            while (true)
            {
                var result = await receiver.ReceiveFromAsync(data, SocketFlags.None, new IPEndPoint(IPAddress.Any, 0));
                var message = Encoding.UTF8.GetString(data, 0, result.ReceivedBytes);

                if (sentMessageNeedBackPing && message == "SUCCESS")
                {
                    Console.WriteLine("GET BACK PING");
                    sentMessageNeedBackPing = false;
                }

                if (message != "SUCCESS") getMessageNeedToSendPing = true;

                if (getMessageNeedToSendPing)
                {
                    await SendConfirmationMessage();
                    getMessageNeedToSendPing = false;
                }

                var tmpMessage = message;

                var readingTime = false;
                var readingUsername = false;
                var readingMessage = false;
                var time = new DateTime();
                var username = "";
                var messageTMP = "";
                var tmp = "";

                foreach (var character in tmpMessage)
                    if (character == Convert.ToChar("|") && !readingTime) // start reading time
                    {
                        readingTime = true;
                    }
                    else if (character == Convert.ToChar("|") && readingTime) // end reading time
                    {
                        time = Convert.ToDateTime(tmp);
                        readingTime = false;
                        tmp = "";
                    }
                    else if (character == Convert.ToChar("#") && !readingUsername) // start reading username
                    {
                        readingUsername = true;
                    }
                    else if (character == Convert.ToChar("#") && readingUsername) // end reading username
                    {
                        username = tmp;
                        readingUsername = false;
                        tmp = "";
                    }
                    else if (character == Convert.ToChar("%") && !readingMessage) // start reading message
                    {
                        readingMessage = true;
                    }
                    else if (character == Convert.ToChar("%") && readingMessage) // end reading message
                    {
                        messageTMP = tmp;
                        readingMessage = false;
                        tmp = "";
                    }
                    else
                    {
                        tmp += character;
                    }

                if (messageTMP != "SUCCESS" && message != "SUCCESS")
                    acceptedMessages.Add(new Message(time, username, messageTMP));

                Console.Clear();

                //need to sort, but is useless in localhost
                
                foreach (var item in acceptedMessages)
                {
                    Console.Write("\t\t\t\t\t\t\t");
                    Console.WriteLine($"{item.SenderName}: {item.Text}");
                    
                }

                foreach (var item in sentMessages) Console.WriteLine($"You: {item.Text}");
            }
        }

        return 0;
    }
}