<?php

/**
*	Category
*
*	Grouping for articles
**/
class Category
{
	/**
	*Get all the categories
	*
	*@param object $conn Connection to the database
	*
	*@return array An associative array of all the category records
	**/
	public $id;
	public $errors = [];
		public $name;
		public $menu;
	public static function getAll($conn)
	{
		$sql = "SELECT *
						FROM category
						ORDER BY name";

		$results = $conn->query($sql);		// PDO
		return $results->fetchAll(PDO::FETCH_ASSOC);		//PDO
	}

	public function create($conn)
		{
			//if($this->validate()){
					$sql = "INSERT INTO category (name,menu)
									VALUES(:name,:menu)";

					$stmt = $conn->prepare($sql);

					$stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
					$stmt->bindValue(':menu', $this->menu, PDO::PARAM_STR);
					//$stmt->bindValue(':content', $this->content, PDO::PARAM_STR);

					if($stmt->execute())
					{
						$this->id = $conn->lastInsertId();
						return true;
					}

				//} else {
				//	return false;
				//}
			}

		public static function getPage($conn, $limit, $offset, $only_published=false,$menuid="-1")
		{
			//$condition = $only_published ? ' WHERE published_at IS NOT NULL' : '';
			if($only_published){
					if ($menuid=="-1") {	

					$sql = "SELECT * FROM category where status=0";

					}else{
					$sql = "SELECT * FROM category where status=0 and menu=".$menuid;
					}}
				else{

			$sql = "SELECT * FROM category";

			}
			$stmt = $conn->prepare($sql);

			//$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
			//$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

			$stmt->execute();

			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			return $results;
		}

		public function update($conn)
		{
			//if($this->validate()){
					$sql = "UPDATE category
									SET name=:name ,menu=:menu
									WHERE id=:id";
					$stmt = $conn->prepare($sql);

					$stmt->bindValue(':id', $this->id, PDO::PARAM_INT);
					$stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
					$stmt->bindValue(':menu', $this->menu, PDO::PARAM_STR);
					//$stmt->bindValue(':content', $this->content, PDO::PARAM_STR);				

					return $stmt->execute();
			//	} else {
			//		return false;
			//	}
			}

			public static function getTotal($conn, $only_published=false)
			{
				$condition = $only_published ? ' WHERE published_at IS NOT NULL' : '';
				return $conn->query("SELECT COUNT(*) FROM article $condition")->fetchColumn();
			}

			public static function getByID($conn, $id, $columns='*')
		{
			$sql = "SELECT $columns
							FROM category
							WHERE id = :id";  // in PDO we can user ? as well as named param instead ?

			$stmt = $conn->prepare($sql);	// PDO

			$stmt->bindValue(':id',$id, PDO::PARAM_INT);  // PDO
			$stmt->setFetchMode(PDO::FETCH_CLASS, 'Category');

			if($stmt->execute())		// PDO
			{
				return $stmt->fetch(); 			// PDO
			}
		}
}
