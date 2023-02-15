using Microsoft.VisualBasic.CompilerServices;

namespace LAB1;

using System.Net;
using System.Net.Sockets;
using System.Text;

public static class Program
{
    public static async Task<int> Main()
    {
        IPAddress localAddress = IPAddress.Parse("127.0.0.1");
        Console.Write("Введите свое имя: ");
        string? username = Console.ReadLine();
        Console.Write("Введите порт для приема сообщений: ");
        if (!int.TryParse(Console.ReadLine(), out var localPort)) return 0;
        Console.Write("Введите порт для отправки сообщений: ");
        if (!int.TryParse(Console.ReadLine(), out var remotePort)) return 0;
        Console.WriteLine();

        // запускаем получение сообщений
        Task.Run(ReceiveMessageAsync);
        // запускаем ввод и отправку сообщений
        await SendMessageAsync();

        // отправка сообщений
        async Task SendMessageAsync()
        {
            using Socket sender = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            Console.WriteLine("Для отправки сообщений введите сообщение и нажмите Enter");
            // отправляем сообщения
            while (true)
            {
                //Console.Write("MESSAGE: ");
                var message = Console.ReadLine(); // сообщение для отправки
                // если введена пустая строка, выходим из цикла и завершаем ввод сообщений
                if (string.IsNullOrWhiteSpace(message)) break;
                // иначе добавляем к сообщению имя пользователя
                message = $"{username}: {message}";
                byte[] data = Encoding.UTF8.GetBytes(message);
                // и отправляем на 127.0.0.1:remotePort
                await sender.SendToAsync(data, SocketFlags.None, new IPEndPoint(localAddress, remotePort));
            }
        }

        // отправка сообщений
        async Task ReceiveMessageAsync()
        {
            byte[] data = new byte[65535]; // буфер для получаемых данных
            // сокет для прослушки сообщений
            using Socket receiver = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            // запускаем получение сообщений по адресу 127.0.0.1:localPort
            receiver.Bind(new IPEndPoint(localAddress, localPort));
            while (true)
            {
                // получаем данные в массив data
                var result = await receiver.ReceiveFromAsync(data, SocketFlags.None, new IPEndPoint(IPAddress.Any, 0));
                var message = Encoding.UTF8.GetString(data, 0, result.ReceivedBytes);
                // выводим сообщение
                Console.WriteLine($" {message}");
            }
        }

        return 0;
    }
}