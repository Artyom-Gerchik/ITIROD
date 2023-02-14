namespace LAB1;

using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

public class Program
{
    public static int Main()
    {
        using var udpSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);

        var localIP = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 5555);
        // начинаем прослушивание входящих сообщений
        udpSocket.Bind(localIP);
        Console.WriteLine("UDP-сервер запущен...");

        byte[] data = new byte[256]; // буфер для получаемых данных
        //адрес, с которого пришли данные
        EndPoint remoteIp = new IPEndPoint(IPAddress.Any, 0);
        // получаем данные в массив data
        var result = udpSocket.ReceiveFrom(data, data.Length, SocketFlags.None, ref remoteIp);
        var message = Encoding.UTF8.GetString(data, 0, result);

        Console.WriteLine($"Получено {result} байт");
        Console.WriteLine($"Удаленный адрес: {remoteIp}");
        Console.WriteLine(message);
        return 0;
    }
}