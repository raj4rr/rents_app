<?php
	/**
	*Article
	*
	*A piece of writing for publication
	**/
	class Article
	{
		/**
		* Unique Identifier
		* @var integer
		**/
		public $id;
		/**
		* The Article Title
		* @var string
		**/
		public $title;

		public $url;

		public $keyword;

		public $main_menu;

		public $modified_user;

		public $afooter;

		public $aheader;

		public $modified_by;

		public $meta_desc;
		/**
		* The Article Content
		* @var string
		**/
		public $content;
		/**
		* The Publication Date And Time
		* @var datetime
		**/
		public $published_at;
		/**
		* Path to the image
		* @var string
		**/
		public $image_file;
		/**
		* Validations Errors
		*
		*@var array
		**/
		public $errors = [];

		/**
		*Get all the articles
		*
		*@param object $conn Connection to the database
		*
		*@return array An associative array of all the article records
		**/
		public static function getAll($conn)
		{
			$sql = "SELECT *
							FROM article
							ORDER BY published_at DESC";

			$results = $conn->query($sql);		// PDO
			return $results->fetchAll(PDO::FETCH_ASSOC);		//PDO
		}

	public static function getAllCategoriesWise($conn,$id)
		{
		$sql = "SELECT article.*, category.name AS category_name,category.id AS category_id
							FROM article
							LEFT JOIN article_category
							ON article.id = article_category.article_id
							LEFT JOIN category
							ON article_category.category_id = category.id
							WHERE category.id = :id";
							$stmt->bindValue(':id',$id, PDO::PARAM_INT);  // PDO

			$results = $conn->query($sql);		// PDO
			return $results->fetchAll(PDO::FETCH_ASSOC);		//PDO
		}

		/**
		*Get all the articles
		*
		*@param object $conn Connection to the database
		*@param object $limit Number of records to return
		*@param object $offset Number of records to skip
		**/
		public static function getPage($conn, $limit, $offset, $only_published=false,$menuid="-1")
		{
			if (isset($_SESSION['user_id'])) {	
			$condition = $only_published ? " WHERE  user_name='".$_SESSION['user_id']."' " : "";
			} 
			else{
				if ($menuid=="-1") {	
					$condition = $only_published ? ' WHERE published_at IS NOT NULL ': '';
						}else{
					$condition = $only_published ? ' WHERE main_menu='.$menuid.' and published_at IS NOT NULL ': '';
				}
				}
	$sql = "SELECT a.*, category.name AS category_name
							FROM (
								SELECT *
								FROM article 
								$condition
								ORDER BY id DESC 
								LIMIT :limit
								OFFSET :offset) AS a
							LEFT JOIN article_category
							ON a.id = article_category.article_id
							LEFT JOIN category
							ON article_category.category_id = category.id 	ORDER BY a.id  DESC ";
        //echo $sql;
			$stmt = $conn->prepare($sql);

			$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
			$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

			$stmt->execute();

			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$articles = [];

			$previous_id = null;

			foreach ($results as $row) {
				$article_id = $row['id'];

				if ($article_id != $previous_id) {
					$row['category_names'] = [];

					$articles[$article_id] = $row;
				}
				$articles[$article_id]['category_names'][] = $row['category_name'];

				$previous_id = $article_id;
			}

			return $articles;
		}

		public static function getCPage($conn, $limit, $offset, $only_published=false,$id)
		{

			$condition = $only_published ? ' WHERE published_at IS NOT NULL ': '';

			$sql = "SELECT a.*, category.name as category_name,category.id as category_id  FROM ( SELECT * FROM article $condition ORDER BY published_at DESC) AS a LEFT JOIN article_category ON a.id = article_category.article_id LEFT JOIN category ON article_category.category_id = category.id WHERE category.id =".$id;
       // echo $sql;
			$stmt = $conn->prepare($sql);

			//$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
			//$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
			//$stmt->bindValue(':id', $id, PDO::PARAM_INT);

			$stmt->execute();

			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$articles = [];

			$previous_id = null;

			foreach ($results as $row) {
				$article_id = $row['id'];

				if ($article_id != $previous_id) {
					$row['category_names'] = [];
					$row['category_id'] = [];

					$articles[$article_id] = $row;
				}
				$articles[$article_id]['category_names'][] = $row['category_name'];
				$articles[$article_id]['category_id'][] = $row['category_id'];
				$previous_id = $article_id;
			}

			return $articles;
		}

		/**
		*Get the article based on the ID
		*
		*@param connection $conn object to the database
		*@param integer $id the article ID
		*@param string $columns optional list of columns for the select, defaults to *
		*
		*@return mixed mixed an object of this class, or null if not found
		**/
		public static function getByID($conn, $id, $columns='*')
		{
			$sql = "SELECT $columns
							FROM article
							WHERE id = :id";  // in PDO we can user ? as well as named param instead ?

			$stmt = $conn->prepare($sql);	// PDO

			$stmt->bindValue(':id',$id, PDO::PARAM_INT);  // PDO
			$stmt->setFetchMode(PDO::FETCH_CLASS, 'Article');

			if($stmt->execute())		// PDO
			{
				return $stmt->fetch(); 			// PDO
			}
		}

		/**
		*	Get the article record based on the ID along with the associative categories, if any
		*
		*	@param object $conn connection to the database
		* @param integer $id the article ID
		*
		* @return array the article data with categories
		**/
		public static function getWithCategories($conn, $id, $only_published=false)
		{
			$sql = "SELECT article.*, category.name AS category_name,category.id AS category_id
							FROM article
							LEFT JOIN article_category
							ON article.id = article_category.article_id
							LEFT JOIN category
							ON article_category.category_id = category.id
							WHERE article.id = :id";

			if ($only_published) {
				$sql .= ' AND article.published_at IS NOT NULL';
			}

			$stmt = $conn->prepare($sql);	// PDO
			$stmt->bindValue(':id',$id, PDO::PARAM_INT);  // PDO

			$stmt->execute();	// PDO

			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}

		/**
		*	Get the articles category
		*
		* @param object $conn connection to the database
		*
		*	@return array the category data
		**/
		public function getCategories($conn)
		{
			$sql = "SELECT category.*
							FROM category
							JOIN article_category
							ON category.id = article_category.category_id
							WHERE article_id = :id";

			$stmt = $conn->prepare($sql);	// PDO
			$stmt->bindValue(':id', $this->id, PDO::PARAM_INT);  // PDO

			$stmt->execute();	// PDO

			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}

		/**
		* Update the article with it's current property values
		*
		* @param object $conn connection to the database
		*
		*	@return boolean True if the update was successfull, otherwise False
		**/
		public function update($conn)
		{
			if($this->validate()){
					$sql = "UPDATE article
									SET title=:title,
									 		content=:content,
									 		url=:url,
									 		meta_desc=:meta_desc,
									 		keyword=:keyword,
									 		main_menu=:main_menu,
											published_at=:published_at,
											modified_user=:modified_user,
									 		modified_by=:modified_by
									WHERE id=:id";
					$stmt = $conn->prepare($sql);

					$stmt->bindValue(':id', $this->id, PDO::PARAM_INT);
					$stmt->bindValue(':title', $this->title, PDO::PARAM_STR);
					$stmt->bindValue(':content', $this->content, PDO::PARAM_STR);
					$stmt->bindValue(':url', $this->url, PDO::PARAM_STR);
					$stmt->bindValue(':keyword', $this->keyword, PDO::PARAM_STR);
					$stmt->bindValue(':meta_desc',$this->meta_desc, PDO::PARAM_STR);
					$stmt->bindValue(':main_menu',$this->main_menu, PDO::PARAM_STR);

					if ($this->published_at == '') {
						$stmt->bindValue(':published_at', null, PDO::PARAM_NULL);
					}else {
						$stmt->bindValue(':published_at', $this->published_at, PDO::PARAM_STR);
					}
					$stmt->bindValue(':modified_user', $this->modified_user, PDO::PARAM_STR);
					$stmt->bindValue(':modified_by', $this->modified_by, PDO::PARAM_STR);

					return $stmt->execute();
				} else {
					return false;
				}
			}

public function updateseo($conn)
		{
			//if($this->validate()){
					$sql = "UPDATE article
									SET title=:title,
									 		aheader=:aheader,
									 		afooter=:afooter,
									 		modified_user=:modified_user,
									 		modified_by=:modified_by,
									 		url=:url,
									 		meta_desc=:meta_desc,
									 		keyword=:keyword,
									 		main_menu=:main_menu,
											published_at=:published_at
									WHERE id=:id";

					$stmt = $conn->prepare($sql);

					$stmt->bindValue(':id', $this->id, PDO::PARAM_INT);
					$stmt->bindValue(':title', $this->title, PDO::PARAM_STR);
					$stmt->bindValue(':aheader', $this->aheader, PDO::PARAM_STR);
					$stmt->bindValue(':afooter', $this->afooter, PDO::PARAM_STR);
					$stmt->bindValue(':modified_user', $this->modified_user, PDO::PARAM_STR);
					$stmt->bindValue(':modified_by', $this->modified_by, PDO::PARAM_STR);
					$stmt->bindValue(':url', $this->url, PDO::PARAM_STR);
					$stmt->bindValue(':keyword', $this->keyword, PDO::PARAM_STR);
					$stmt->bindValue(':meta_desc',$this->meta_desc, PDO::PARAM_STR);
					$stmt->bindValue(':main_menu',$this->main_menu, PDO::PARAM_STR);

					if ($this->published_at == '') {
						$stmt->bindValue(':published_at', null, PDO::PARAM_NULL);
					}else {
						$stmt->bindValue(':published_at', $this->published_at, PDO::PARAM_STR);
					}
					//echo $sql;
					return $stmt->execute();

			}
		/**
		*	Set the article category
		*
		*	@param object $conn Connections to the database
		*	@param array $ids Category Ids
		*
		* @return void
		**/
		public function setCategories($conn, $ids)
		{
			if($ids){
				$sql = "INSERT IGNORE INTO article_category(article_id, category_id)
								VALUES ";
								// category_id must be bind because data is coming from, form but normal article_id can be called by instance of current class
								// IGNORE Statement in mariaDB helps ignoring Exceptions(In this case PDO Exception)

				$values = [];

				foreach ($ids as $id) {
					$values[] = "({$this->id}, ?)";		// ? placeholder used as we don't know how many placeholder we need
				}

				$sql .= implode(", ",$values);

				$stmt = $conn->prepare($sql);

				foreach ($ids as $i => $id) {
					$stmt->bindValue($i +1, $id, PDO::PARAM_INT);
				}
				$stmt->execute();		// outside loop becasause we are having only one statement to execute
			}

			$sql = "DELETE FROM article_category
							WHERE article_id = {$this->id}";

			if($id){
				$placeholders = array_fill(0, count($ids), '?');

				$sql .= " AND category_id NOT IN (" . implode(", ", $placeholders) . ")";
			}

			$stmt = $conn->prepare($sql);

			foreach ($ids as $i => $id) {
				$stmt->bindValue($i +1, $id, PDO::PARAM_INT);
			}

			$stmt->execute();

		}

		/**
		*Validate the properties by putting validation error message in the $error property
		*
		*@return boolean True if the current properties are valid, False otherwise
		**/
		protected function validate()
		{
			if($this->title=='')
			{
				$this->errors[] = "Title is Required";
			}
			if ($this->content=='')
			{
				$this->errors[] = "Content is Required";
			}
			if($this->published_at != '')
			{
				$date_time = date_create_from_format('Y-m-d H:i:s', $this->published_at);

				if ($date_time == false) {
					$this->error[] = "Invalid Date and Time";
				} else {
					$date_errors = date_get_last_errors();
					if($date_errors('warning_count'>0))
					{
						$this->errors[] = "Invalid Date & Time";
					}
				}
			}
			return empty($this->errors);
		}

	/**
	* Delete the current Article
	*
	*	@param object $conn connection to the database
	*
	* @return boolean True if delete was successfull, False otherwise
	**/
		public function delete($conn)
		{
			$sql = "DELETE FROM article
							WHERE id=:id";

			$stmt = $conn->prepare($sql);

			$stmt->bindValue(':id', $this->id, PDO::PARAM_INT);

			return $stmt->execute();
		}

		/**
		* Insert a article with it's current property values
		*
		* @param object $conn connection to the database
		*
		*	@return boolean True if the insert was successfull, otherwise False
		**/
		public function create($conn)
		{
			if($this->validate()){
					$sql = "INSERT INTO article (title, content, published_at,user_name,url,keyword,meta_desc,main_menu)
									VALUES(:title, :content, :published_at,:user_name,:url,:keyword,:meta_desc,:main_menu)";

					$stmt = $conn->prepare($sql);

					$stmt->bindValue(':title', $this->title, PDO::PARAM_STR);
					$stmt->bindValue(':content', $this->content, PDO::PARAM_STR);
					$stmt->bindValue(':user_name', $_SESSION['user_id'], PDO::PARAM_STR);
					$stmt->bindValue(':url', $this->url, PDO::PARAM_STR);
					$stmt->bindValue(':keyword', $this->keyword, PDO::PARAM_STR);
					$stmt->bindValue(':meta_desc',$this->meta_desc, PDO::PARAM_STR);
					$stmt->bindValue(':main_menu',$this->main_menu, PDO::PARAM_STR);

					if ($this->published_at == '') {
						$stmt->bindValue(':published_at', null, PDO::PARAM_NULL);
					}else {
						$stmt->bindValue(':published_at', $this->published_at, PDO::PARAM_STR);
					}

					if($stmt->execute())
					{
						$this->id = $conn->lastInsertId();
						return true;
					}

				} else {
					return false;
				}
			}

			/**
			*	Get a count of total number of records
			*
			*	@param object $conn connection to the database
			*
			* @return integer the total number of records
			**/
			public static function getTotal($conn, $only_published=false)
			{
				$condition = $only_published ? ' WHERE published_at IS NOT NULL' : '';
				return $conn->query("SELECT COUNT(*) FROM article $condition")->fetchColumn();
			}

			/**
			*	Update the image file property
			*
			*	@param object $conn connection to databse
			* @param string $filename the filename of the image file
			*
			* @return boolean true if it was successfull, false otherwise
			**/
			public function getImageFile($conn, $filename)
			{
				$sql = "UPDATE article
								SET image_file = :image_file
								WHERE id = :id";

				$stmt = $conn->prepare($sql);

				$stmt->bindValue(':id', $this->id, PDO::PARAM_INT);
				$stmt->bindValue(':image_file', $filename, $filename == null ? PDO::PARAM_NULL : PDO::PARAM_STR);

				return $stmt->execute();
			}

			/**
			*	Publish the article, setting the published_at field to the current date and time
			*
			*	@param object $conn connection to the database
			*
			*	@return mixed the published_at date and time if successfull, null otherwise
			**/
			public function publish($conn)
			{
				$sql = "UPDATE article
								SET published_at = :published_at
								WHERE id = :id";

				$stmt = $conn->prepare($sql);
				$stmt->bindValue(':id', $this->id, PDO::PARAM_INT);

				$published_at = date("Y-m-d H:i:s");
				$stmt->bindValue(':published_at', $published_at, PDO::PARAM_INT);

				if ($stmt->execute()) {
					return $published_at;
				}
			}

			public static function getAllCountByDate($conn)
		{
			$sql = "SELECT DATE_FORMAT(`created_by`, '%M/%D/%Y') as published_at,count(*) as count FROM `article` GROUP by DATE_FORMAT(`created_by`, '%M/%D/%Y') ORDER BY `created_by` DESC";

			$results = $conn->query($sql);		// PDO
			return $results->fetchAll(PDO::FETCH_ASSOC);		//PDO
		}
	}
