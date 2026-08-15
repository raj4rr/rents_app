
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

        // echo $_SERVER["HTTP_REFERER"]; Getting the Previous URL
function displayContents($language){

}
        // echo $_SERVER["HTTP_REFERER"]; Getting the Previous URL
function displayContents1($language,$pdo = null){
    if ($pdo === null) {
        global $pdos;
        $pdo = $pdos;
    }

 $language1= str_replace("Subjective","SUB",$language) ;
  $language1= str_replace("Objective","OBJ",$language) ;
  $language1= str_replace("INTER","SUB",$language) ;

    // Universal Modern GUI
    $stm = $pdo->prepare("SELECT q.id, q.question, MIN(a.answer) as answer FROM `question` q LEFT JOIN `answer` a ON q.id = a.question_id WHERE q.language=:lang AND (q.hide='NO' OR q.hide='N') GROUP BY q.id");
    $stm->execute([':lang' => $language1]);
    $rows = $stm->fetchAll(PDO::FETCH_ASSOC);
    ?>
    <style>
        .mcq-container {
            font-family: 'Inter', -apple-system, sans-serif;
            max-width: 800px;
            margin: 0 auto;
        }
        .mcq-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-left: 4px solid #ff7a00;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .mcq-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.1);
        }
        .mcq-question-text {
            font-size: 1.15rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 16px;
            line-height: 1.5;
        }
        .mcq-options {
            list-style: none;
            padding-left: 0;
            margin-bottom: 20px;
        }
        .mcq-option {
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 8px;
            color: #4a5568;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
        }
        .mcq-option:hover {
            background: #fffaf0;
            border-color: #ff7a00;
        }
        .mcq-actions {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .btn-show-answer {
            background: linear-gradient(135deg, #ff7a00 0%, #ff5200 100%);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(255, 122, 0, 0.2);
            transition: opacity 0.2s, transform 0.1s;
        }
        .btn-show-answer:hover {
            opacity: 0.9;
        }
        .btn-show-answer:active {
            transform: scale(0.98);
        }
        .mcq-answer {
            display: none;
            margin-top: 16px;
            padding: 16px;
            width: 100%;
            background: #f0fff4;
            border-left: 4px solid #48bb78;
            border-radius: 6px;
            color: #276749;
            font-weight: 500;
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
    <div class="mcq-container">
        <?php foreach ($rows as $index => $row): 
            $raw_question = trim($row['question']);
            $lines = explode("\n", $raw_question);
            $question_text = "";
            $options = [];
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line)) continue;
                // Treat lines starting with a digit and dot/bracket as options
                if (preg_match('/^\d+[\.\)]/', $line)) {
                    $options[] = $line;
                } else {
                    $question_text .= $line . " ";
                }
            }
        ?>
        <div class="mcq-card">
            <div class="mcq-question-text">
                Q<?= $index + 1 ?>. <?= nl2br(trim($question_text)) ?>
            </div>
            <?php if (!empty($options)): ?>
                <ul class="mcq-options">
                    <?php foreach ($options as $opt): ?>
                        <li class="mcq-option" onclick="this.style.background='#fffaf0'; this.style.borderColor='#ff7a00';"><?= nl2br(trim($opt)) ?></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
            <div class="mcq-actions">
                <button class="btn-show-answer" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'; this.innerText = this.innerText === 'Show Answer' ? 'Hide Answer' : 'Show Answer';">Show Answer</button>
                <div class="mcq-answer">
                    <strong>Correct Answer:</strong> <?= nl2br(trim($row['answer'])) ?>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <?php
} // End of displayContents1 function
?>

