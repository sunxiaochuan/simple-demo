<?php
//用php的面向对象来写
/**
* 新建一个类
*/
class Conmysql
{
	//定义所需的变量
	//public关键字表示属性或方法是公开可见的
	public $servername;
	public $username;
	public $password;
	public $dbname;
	public $con = null;
	//添加构造方法
	public function __construct($servername,$username,$password,$dbname){
		$this->servername = $servername;
		$this->username = $username;
		$this->password = $password;
		$this->dbname = $dbname;
	}
	//创建数据库链接方法
	//参考网址：http://www.runoob.com/php/php-mysql-connect.html -> 实例 (PDO)
	public function getConnection(){
		//这里用的是 PDO 方法
		try {
			$dsn = "mysql:host=$this->servername;dbname=$this->dbname";
			    $this->con = new PDO($dsn, $this->username, $this->password);
			    // echo "连接成功"; 
			}
		catch(PDOException $e)
			{
			    echo $e->getMessage();
			}
	}
	//更新数据的方法
	public function updateDate($sql){
		//如果未连接的话就链接到数据库
		if($this->con == null){
			$this->getConnection();
		}
		//向前台输出 json 格式的数据
		header('content-type:application/json;charset=utf8');
		//执行sql 
		//参考链接：http://www.runoob.com/php/php-mysql-insert.html -> 实例 (PDO)
		$res=$this->con->exec($sql);
		//执行之后 输出返回的数据
		$arr = array('result'=>$res);
		echo json_encode($arr);
		//关闭链接
		$this->closeCon();
	}
	//关闭链接的方法
	public function closeCon(){
		$this->con = null;
	}
}
/**
* 创建子类
*/
class realConn extends Conmysql
{
	//继承父类的构造方法
	public function __construct($servername,$username,$password,$dbname){
		parent::__construct($servername,$username,$password,$dbname);
	}
	//真正执行 sql 的方法
	public function updateRealDate(){
		$sql = "UPDATE text SET num=num+1 WHERE id=1";
		$this->updateDate($sql);
	}
}
//将子类实例化执行方法
$praiseCon = new realConn('localhost','root','','praise');
$praiseCon->updateRealDate();
?>