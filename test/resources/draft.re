= データの種類と特徴

//lead{
この章では、プログラムの重要な要素であるデータにまつわる話題について解説します。
データには、いったん生成されたあとで変更されるものと変更が許されないものがあります。
さらにデータは変数に格納され、その変数を介してアクセスされます。
その際にも変数の内容が変更される場合があります。
本章では、データとデータに関係する話題ともに、こうした機能が関数型プログラミングに与える影響を考察していきます。

#@# データは、それが合成されたものであるかどうかによって、基本型と合成型に分類されます。
#@# いったん生成されたデータはその内容が変更される場合があります。
#@# また代入という操作でも変数の内容が変更されます。
#@# その本章ではデータとデータに関係する話題、「型」や「変数」などについて、関数型プログラミングの視点から解説します。

#@# 関数型プログラミングから重要な点は、
#@# 1) データの不変性
#@# 2) 参照という仕組み

//}


=={type} 型とは何か

プログラムで表現することのできるデータの数はほとんど無数です。
例えば、@<code>{1,0.123, "a", "bbb", true} など、多種多様なデータが表現可能だからです。
この複雑な対象を整理するために「型」(データ型とも呼びます)という考えが導入されました。
例えば、@<code>{1, 0.3, -100,...} といった値はすべて数値型であり、@<code>{true,false}はいずれも論理（ブール値）を表わす型です。
いずれも数値型や真理値型といったレベルでは、こうした具体的な値が何であるかを気にしていないという点で型は抽象化のひとつです。

「型」は、私たちが中学時代に学んだ「集合」によく似た概念です。
「集合」とは、ある条件を満たすもの全体の集まりを意味します。
例えば、「10以下の自然数の集合」は、以下のようになります。

//texequation{
        集合A = \{ 0,1,2,3,4,5,6,7,8,9,10 \}
//}


一方で型には集合とは異なった側面があります。
まず第一に、同じ型に属するデータは同じ方法で生成されます。これは要素がどうやって作られるのかという点に集合が言及しないのと対照的です。◆◆◆宿題　この一文、ちょっと意味不明です。◆◆◆
例えば、整数は 0 に succ関数を繰り返し適用することで得られます。

//listnum[integer_construction][整数の作り方]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, integer_construction)
      var succ = (n) => {
        return n + 1;
      };
      expect(
        succ(0)
      ).to.eql(
        1
      );
      expect(
        succ(succ(0))
      ).to.eql(
        2
      );
#@end
//}

数値を表現するのに毎回上記のような手続きを使うのはあまりに煩雑です。
そこで、値を生成するのにリテラル（literal）という記法が準備されました。
リテラルとはデータの内容をそのままコードとして表現することです（直値ともいいます）。
つまり、@<code>{succ(0)} と書くかわりに @<code>{1}、@<code>{succ(1)} と書くかわりに @<code>{2}などと書くことで簡単にデータを生成することができます。

第二に、型にはその型に対して定義された演算が利用できます。
例えば、数値型には@<code>{+ - * /} などの演算が定義されているので、こうした演算を数値に適用するには問題ありません（**コマンドライン4.1**）。

**コマンドライン4.1**
//cmd{
node> 1 + 2
 =>
#@mapoutput(node -p "1 + 2")
3
#@end
node> 2 * 3
#@mapoutput(node -p "2 * 3")
6
#@end
//}

ところがある型に定義されている演算を、他の型に適用することはできません。
例えば、文字列にかけ算を適用しても意味のある結果は得られません（**コマンドライン4.2**）。

**コマンドライン4.2**
//cmd{
node> "This is a string" * "This is another string"
 =>
#@mapoutput(node -p "")
undefined
#@end
//}


第三に、型は階層を持ちます。 
階層構造では、派生した下位の型は上位の型の性質を併せもちます。
つまり基本型の下位に属する文字列型や数値型は、基本型の持つ性質も合せ持っています（基本型が持つ性質については、4.2で後述します）。
JavaScriptのデータ型は @<img>{class_hierachy}のような階層構造になっています。

//image[class_hierachy][JavaScriptのデータ型構造][scale=0.3]{
file://./images/chap04-class_hierachy.png

//}

最後に、型は「値を包みこむ容器」と見ることもできます。
例えるならば、型を一種の箱のようなものとして捉えるのです。
例えば、@<img>{type_example}にあるように、箱Aは楽器を入れる容器で、箱Bは動物を入れる容器だとしましょう。
箱Aからはトランペットや太鼓が取り出され、箱Bからはキリンやライオンが飛び出します。
仮にそれらが具体的に何であるかは不明であったとしても、箱Aから取りだされたものは楽器で、箱Bから飛び出したものは動物だとわかります。
これを値の側からながめると、型はいわば値を包みこんでいる容器のような存在です。この例でいうと、箱Aは「楽器店」。箱Bは「動物園」という建造物（施設）といえるでしょう。

//image[type_example][箱と値の関係][scale=0.4]{
file://./images/chap04-type_example.png
//}


=={basic_type} 基本型

データ型は、その内部に構造を持つものと構造を持たないものに大きく分類されます。
そのうち、内部に構造を持たない原始的なデータ型を、@<kw>{基本型}と呼びます。
JavaScriptには、次のような種類の基本型が用意されています。

 * ブール型
 * 数値型
 * 文字列型
 * 未定義型

ブール型とは @<code>{true} と @<code>{false}の2種類の値を持つ型で、数値型は @<code>{1, -3, 0.95} といった数値を表現する型です。
また、文字列型とは "我思うゆえに我あり" といった文字の並びを表現するデータ型です。
未定義型はやや特殊な型であり、値が定義されていないことを意味します。
未定義型には、undefined と nullの2種類の値があります。
このうちnullは値が存在しないことを意味し、undefined はあとでデータが格納されるかも知れないが現時点ではデータが存在しない（未定義）ことを意味します。
そこでJavaScriptでは、宣言されただけで値と結びついていない変数には undefined が格納されます(@<list>{undefined_variable})。


//listnum[undefined_variable][未定義の変数]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, undefined_variable)
      var variable; // 宣言されているが値と結びついていない変数
      expect(
        variable
      ).to.be(
        undefined
      );
#@end
//}

関数型プログラミングの観点から見て重要な点は、基本型はその中身のデータが不変であるという点です。
不変というのは、いったんデータが生成されたあとはその内容を変更できないという性質を意味します。
例えば、trueという真理値が突然falseに変わることはなく、1という数値もそれ以外の数値に変わることはありません。
そのため、trueは必ずtrueと等しく、1は必ず1と等しくなります（**コマンドライン4.7**）。

**コマンドライン4.7**
//cmd{
node> true === true
 =>
#@mapoutput(node -p "true === true")
true
#@end


node> 1 === 1
 =>
#@mapoutput(node -p "1 === 1")
true
#@end
//}

ここでは === という比較演算子を利用して両者のデータが同値であるかどうかを判定しています。
ところでJavaScriptの比較演算子には === のほかに == という演算子もあります。
ただし、この ==演算子 は比較対象の値に対して自動的に型変換を実行してしまいます。
この挙動は、同値性の予測をしばしば困難にします。
例えば==演算子によって同値と判定される例を @<list>{equality_operator} に挙げてみました。◆◆◆宿題　リスト4.3から読み取れる結果の記述も欲しいです。例「ここでは、あろうことか、真理値型データが数値型データにすり替わっていることがわかります。」◆◆◆
一貫性の乏しい規則を全て記憶するのは賢明ではなく、それを前提としてコードを書くのはバグの原因になります。◆◆◆宿題　この一文ちょっと意味不明です。◆◆◆
このようにJavaScriptでは、常に===演算子を用いて同値を判定すべきでしょう。

//listnum[equality_operator][==比較演算子]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, equality_operator)
      expect(
        null == undefined
      ).to.be(
        true
      );
      expect(
        false == ''
      ).to.be(
        true
      );
      expect(
        true == '1'
      ).to.be(
        true
      );
      expect(
        1 == '1'
      ).to.be(
        true
      );
#@end
//}




=={complex} 合成型

基本型の特徴は内部に構造を持たないことでした。
そのため、基本型の値をより細かい部分に分割することはできません。
例えば、ブール型のtrueや数値の10はそれだけでひとつの値であって、さらに細かく分解することはできません。
これとは対照的に、合成型は内部に構造を持つのが特徴です。
そして、合成型は基本型を組み合わせて値の集まりを表現することが可能です。
逆にまた内部構造の一部を取りだすことも可能となります。

JavaScriptには、主に次のような合成型が準備されています。
このうち配列型と関数型はオブジェクト型の一種です(@<img>{class_hierachy})。

 * オブジェクト型
 * 配列型
 * 関数型


ここでは例として図4.3のようなアドレス帳の名簿を考えてみます。
そしてこの名簿を合成型として表現する過程で合成型の特徴を見ていきます。

//image[addressbook][アドレス帳の例][scale=0.3]{
file://./images/chap04-addressbook.png
//}


==={object_type} オブジェクト型

最初に取りあげる合成型は、オブジェクト型です。
オブジェクト型は、値のペアを格納します。
ペアとはキーとデータを対にしたものです。
それは、鍵のかかる箱のようなものです。それぞれの箱には特有の鍵があります。
箱の中のデータにアクセスする鍵となるキーを指定し、そのキーに該当する箱からデータ（値）が取り出されます。

合成型のデータを作成するには、キーと値はコロンで区切り、コロンの左側にはキーを、コロンの右側に値を指定します。
なお、生成された合成型のデータは@<kw>{インスタンス}（instance）とも呼ばれます。

//list[object_structure][オブジェクト型の構造]{
{
  キー1 : 値1 , 
  キー2 : 値2 , 
  キー3 : 値3 , 
  ...
}
//}

例えば、名簿のユーザーIDと名前の対応をオブジェクト型で表現すると @<list>{object_instance_example}のようになります。

//list[object_instance_example][オブジェクト型の例]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, object_instance_example)
          var addressbook = {
            No1: "Alan Turing",
            No2: "Jane Austen",
            No3: "Fyodor Dostoyevsky",
            No4: "Ada Lovelace"
          };
#@end
//}


それでは、このオブジェクト型に性別や誕生日などの情報も入れることを考えてみます。
オブジェクト型の箱の中身には、値であれば何でも入れることができます。
あるいはオブジェクトの中にオブジェクトを入れて、オブジェクトの入れ子を作ることも可能です。
これを利用して各メンバーごとに名前と誕生日を格納するオブジェクトを作ると、元のアドレス帳に近い構造のオブジェクト型ができます(@<list>{object_can_embed_object})。

//listnum[object_can_embed_object][オブジェクトの入れ子]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, object_can_embed_object)
          var addressbook = {
            No1: {
              name: "Alan Turing",
              gender: "male",
              birthDay: "1912/6/23"
            },
            No2: {
              name: "Jane Austen",
              gender: "female",
              birthDay: "1775/12/16"
            },
            No3: {
              name: "Fyodor Dostoyevsky",
              gender: "male",
              birthDay: "1821/11/11"
            },
            No4: {
              name: "Ada Lovelace",
              gender: "female",
              birthDay: "1815/12/10"
            }
          };
#@end
//}

データは格納するだけでは意味がありません。
格納したデータにアクセスする手段が必要です。
オブジェクト型に格納された値にアクセスするには、@<code>{オブジェクト.キー} という記法を利用します。
例えば、@<list>{object_can_embed_object}で定義された名簿のなかの Jane Austenの情報を取得したければ、@<code>{addressbook.No2}とします。
あるいは @<code>{addressbook["No2"]}のような記法も可能です。
もし該当するキーがなければ未定義型の undefined が返ります。
あるキーに対応する値が存在するかどうかをあらかじめ知るためには、JavaScriptではhasOwnPropertyというメソッドが用意されています(@<list>{object_access})。

//list[object_access][インスタンスへのアクセス]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, object_access)
          expect(
            addressbook.No1.name     // オブジェクト.キー記法
          ).to.eql(
            "Alan Turing"
          );
          expect(
            addressbook["No1"]["name"]  // オブジェクト[キー]記法
          ).to.eql(
            "Alan Turing"
          );
          expect(
            addressbook.hasOwnProperty("No1")
          ).to.eql(
            true
          );
          expect(
            addressbook.hasOwnProperty("No9")
          ).to.eql(
            false
          );
#@end
//}


==={array_type} 配列型

前項では名簿をオブジェクト型の入れ子として表現しました。
しかし、名簿は一人一人のデータが順番に並んだものです。
このようなデータは、じつは配列型として表現したほうが適切なのです。

配列型とは、複数のデータが順番に並んだデータ型のことです。
他の多くの言語と同じように、JavaScriptでも配列は鉤括弧 [] のなかに値をコンマ , で区切って表現します。
例えば、10と11と12の配列は [10,11,12] となります(@<list>{array_access})。
配列型では@<code>{array[index]} という記法で配列の要素にアクセスできます。
配列の位置はインデックスと呼ばれ、0から始まる整数です。
もし指定したインデックスに要素が存在しなければ、 undefined が返ります。

//list[array_access][配列の基本操作]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, array_access)
        var array = [10,11,12];
        expect(
          array[0]
        ).to.eql(
          10
        );
        expect(
          array[2]
        ).to.eql(
          12
        );
        expect(
          array[100]
        ).to.eql(
          undefined
        );
#@end
//}


配列は計算機で処理するのに特に適したデータ型です。
なぜなら、計算機は同じことを繰りかえして処理するのに長けているからです。
そこでJavaScriptは、こうした繰り返し処理を簡単に実現する配列型のメソッドをいくつか準備しています。
例えば、以下のArray.sortは配列の要素を並びかえるためのメソッドです(@<list>{sort_in_array})。


//listnum[sort_in_array][sortによる配列要素の並べ替え]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, sort_in_array)
        var array = [5,3,4,1,2];
        expect(
          array.sort((n,m) => {
            return n > m;
          })
        ).to.eql(
          [1,2,3,4,5]
        );
#@end
//}


ところでJavaScriptでは配列の要素を全て同じデータ型にそろえる必要はありません。
異なるデータ型であっても同じ配列の要素になることができます。
それを利用すれば、名簿の1行を@<code>{["No1","Alan Turing","1912/6/23"]}と表現することも可能です。
この性質は一見すれば柔軟性に富んで便利に見えます。
しかし、種類の違うデータの集りを配列として表現することはあまり意味がありません。
なぜなら、そもそもデータの並びを配列として表現したのは、配列が反復処理に長けているからでした。
要素の種類や意味が異なっていれば、その恩恵を受けることができません。
そのため、配列の要素は同じ種類に限定すべきです。

以上の話を前提にして、名簿を配列型で表現してみます。
一人一人のデータは @<code>{ {name: 名前, gender: 性別, birthDay: 誕生日}} という同じオブジェクト型なので、これらを全てまとめてから配列の要素とします(@<list>{addressbook_example_in_array})。

//list[addressbook_example_in_array][アドレス帳の配列型表現]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, addressbook_example_in_array)
          var addressbook = [ // 配列に要素を格納する
            {
              name: "Alan Turing",
              gender: "male",
              birthDay: "1912/6/23"
            },
            {
              name: "Jane Austen",
              gender: "female",
              birthDay: "1775/12/16"
            },
            {
              name: "Fyodor Dostoyevsky",
              gender: "male",
              birthDay: "1821/11/11"
            },
            {
              name: "Ada Lovelace",
              gender: "female",
              birthDay: "1815/12/10"
            }
          ];
#@end
//}


いったん配列で表現すれば、配列型に定義された関数を適用できるようになります。
例えば、 前述のArray.sortメソッドを利用すれば簡単に名簿をアルファベット順に並べかえることができます(@<list>{sorting_array})。なお、アルファベット順の並び替えには、JavaScriptでは記号「<」「>」が使えます。

//list[sorting_array][アドレス帳の配列型表現]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, sorting_array)
        expect(
          addressbook.sort((onePerson,anotherPerson) => {
            return onePerson.name> anotherPerson.name;
          })
        ).to.eql(
          [
            {
              name: "Ada Lovelace",
              gender: "female",
              birthDay: "1815/12/10"
            },
            {
              name: "Alan Turing",
              gender: "male",
              birthDay: "1912/6/23"
            },
            {
              name: "Fyodor Dostoyevsky",
              gender: "male",
              birthDay: "1821/11/11"
            },
            {
              name: "Jane Austen",
              gender: "female",
              birthDay: "1775/12/16"
            }
          ]
        );
#@end
//}

==={function_type} 関数型

#@# 名簿に年齢の情報を入れることを考えてみましょう。
#@# 年齢は他のデータとは性質が異なります。
#@# 名前や性別はそれ自体で独立したデータですが、年齢は誕生日に依存したデータなのです。

3つめ説明する合成型は、関数型です。
JavaScriptの関数はFunctionオブジェクトと呼ばれるオブジェクト型の一種です。
オブジェクト型のデータとしていくつかのプロパティを持ちます。
例えば、lengthプロパティには引数の数が格納されています。

//listnum[function_is_object_type][関数はオブジェクト型である]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, function_is_object_type)
        var func = (n) => {
          return n;
        };
        expect(
          func.length
        ).to.be(
          1
        )
        expect(
          func.hasOwnProperty('name')
        ).to.be(
          true
        )
#@end
//}


関数型の最大の特徴は、() をつけて評価すると関数が実行される点です。
()のなかには関数に渡す実引数を指定します。
すると、関数は渡された引数の情報に従ってその本体を計算します。
関数型モデルに従うかぎり、その計算は関数適用で渡された実引数で関数本体に出現した仮引数を置換するという仕組みで実現されます◆◆◆宿題　この一文もっとわかりやすく！◆◆◆　(@<hd>{chap01|functional_model}参照)。

ところで関数型では、引数が無くても構わない、ダイレクトな構文も可能です(@<list>{function_without_argument})。
この例の場合、関数threeは引数に依存することなく本体を計算し3を返します。

//listnum[function_without_argument][引数のない関数]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, function_without_argument)
        var three = () => {
          return 3;
        };
        expect(
          three()
        ).to.eql(
          3
        )
#@end
//}

@<list>{function_without_argument}のコードを見ると、関数と変数はよく似ていることに気付きます。
例えば、以下(@<list>{function_resembles_variable})のように変数として定義した場合とその結果は変りません。
変数は引数のない関数と考えることもできるのです。

//listnum[function_resembles_variable][関数と変数の類似]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, function_resembles_variable)
        var three = 3;
        expect(
          three
        ).to.eql(
          3
        );
#@end
//}

ところが関数が変数と決定的に異なる点もあります。
第1に、関数では適用されて初めて結果が計算される点です。
@<list>{function_without_argument}では、@<code>{three}を評価しただけでは関数が返ってくるだけで、結果の3は得られません。
@<code>{three()}として関数を適用して初めて結果の3が返ってきます。
そのため、データ取得のタイミングを遅らせることができます。
そして、そのタイミングは関数の呼び出し側で自由にコントロールできます。
その結果、プログラムの表現力を大きく向上させることができるのです。

このことを日常生活の中に似た事例を挙げるとすれば、冷蔵庫でしょうか。
今では多くの家庭に普及している冷蔵庫ですが、この機械がなかった時代には、その日に買ってきた食材はその日のうちに使ってしなわなれば腐ってしまいました。
ある材料だけで食事を作ることになるので、その献立はごく限られたものになっていました。
そこに冷蔵庫があれば事情が一変します。
冷蔵庫は以前に買った食材を保存しておいて、好きなときに利用できます。
これだけで献立のレパートリーの幅が格段に増えます。
なぜなら今日買ってきた食材だけでなく、冷蔵庫に蓄えられている他の食材も組み合わせて今晩の献立を考えることができるからです。
これはプログラミングでも同様です。あえてその場で計算せず、いわば冷蔵庫でフリーズさせた関数を必要に応じて解凍し（呼び出し）、現在調理中の具材に投入し料理する（計算する）ことができるのです。

第2に、引数を渡して挙動を調整できる点です。
@<code>{var three = 3;} のように変数で定義された値は、その値しか返すことはできません。
一方で、関数ではもっと可能性が広がります。
例えば @<code>{ var three = (base) => { 中略 \} }  という関数を作ってみます。
この関数は引数のbaseで指定された進数で10進法の3を表現するとしましょう。
3を2進法で表したいとすると @<code>{three(2)} となります。8進法ならば @<code>{three(8)}です。
どうです。
ただ単に3を返すより、ずっと使い勝手がよくなりました。

このように関数では実行のタイミングとその挙動を自在に操ることで、表現の組み合わせが格段に豊かになるのです。


#@# コールバック関数については @<hd>{function_higher|callback},遅延評価については@<hd>{function_higher|curry}、継続渡しについては@<hd>{function_higher|continuation}でそれぞれの技法を紹介していきます。

==={abstract_datatype} 抽象データ型

合成型は、基本型に比べると複雑なデータ構造です。
その理由のひとつには、種類の異なる値も格納できるからであり、もうひとつには入れ子構造をとれるからです。
これは一見柔軟に見えますが、実は同時に大きな危険を孕んでいます。
複雑すぎる対象物は、他人から見て理解しにくく扱いにくいのです。
複雑性に対処する有効な手段は抽象化でした。
そこでデータ型も抽象化することにより、扱いを単純にすることができます。つぎにそれを見ていきましょう。

そもそも抽象化は本質のみを抽出して詳細を隠蔽することでした(@<hd>{chap03|abstraction}章)。
それではデータ型を抽象化する上で欠かすことのできない本質とは何でしょうか？
データを利用する上で絶対に必要なものは、実はデータそのものではなく、データへの操作なのです。
例えば、自分のコンピュータの中にお気に入りの動画がたくさん入っているとします。
あるときそのコンピュータのキーボードとディスプレイモニターが壊れてしまいました。ただしハードディスクだけは生きています。
このような状況ではデータは無意味です。データを利用する手段がないからです。
つまりデータの本質はデータの操作方法にあり、データがどのように蓄えられているかという実装は些細なことなのです。
このようにデータの実装を隠蔽してその操作法のみを公開するデータ型を、@<kw>{「抽象データ型 abstract datatype」}といいます。

抽象データ型には少なくとも以下の3つの操作が必要です。

 * 空のデータ構造を作る
 * データ構造に値を入れて拡張する(構築子)
 * データ構造から値を取得する(抽出子)

抽象データ型の例として、ここではリストというデータ構造を考えてみましょう。
リストは、配列型と同じように、要素の並びを表現するデータ型です。
ただし、配列よりもデータの操作が制限されています。
リストにデータを追加する際は先頭にひとつ要素を付け足すだけです。
またリストからデータを取りだすときも先頭からひとつだけ取りだします。
これは例えば、電車を1両ずつ連結させたり、切り離すようなものです(@<img>{train_list})◆◆◆編集コメント　この図には、「切り離す」が入っていませんが？◆◆◆
。


//image[train_list][電車というリスト][scale=0.3]{
file://./images/chap04-train_list.png


//}

電車を1両ずつ連結させるのに必要な手順とは何でしょうか。
それは、電車が一台も無い状態にする操作、電車を先頭に接続する操作、先頭の電車を切り離す操作、の3点です。
したがって、抽象データ型のリストに必要になる操作は以下のとおりです(@<list>{abstract_list})。ここでは、5つの操作を考えました。
empty関数は、電車が1両もない状態を作りだす関数です。
consは construction(構築する)の略であり、リストの先頭に値を追加してリストを延長します。
リストから値を取得する操作は2つ準備されています。
head関数はリストの先頭から値を一つとってくる関数です。
一方、tail関数は先頭以降のデータをとってくる関数です。
値を取得する操作は2つだけで十分なのは、それらの操作を繰り返すことでリスト上のどんな位置にある値も取ってくることが可能だからです。

//listnum[abstract_list][抽象データ型としてのリスト]{
var empty = () => {
  // 空のリストを作る処理
};

var cons = (value, list ) => {
  // リストに値を格納する処理
};

var head = (list) => {
  // リストの先頭を取りだす処理
};

var tail = (list) => {
  // リストの後尾を取りだす処理
};

var isEmpty = (list) => {
  // リストが空かどうかを判定する処理
};

//}

それではこのリストの抽象データ型を実際に使ってみましょう。
実際に動かすには @<list>{abstract_list} の関数の本体を実装しなくてはなりませんが、ここではリストの挙動にしたがって実装されたものとします(実装の例は @<hd>{chap05|conditional|switch|algebraic_datatype} を参照してください)。

リストに 2,1 と順々に格納して、そこから2番目の要素を取りだすという操作を行なう場合は、(@<list>{list_as_abstract_type})となります。
リストの操作に抽象データ型のインターフェースに定義された関数だけを使っている点に注意してください。
◆◆◆宿題　もう少し説明しないと理解できません。◆◆◆

//listnum[list_as_abstract_type][抽象データ型としてのリスト]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, list_as_abstract_type)
        expect(
          head(tail(cons(1,cons(2,empty))))
        ).to.eql(
          2
        );
#@end
//}

そもそも抽象データ型ではデータの操作を定義したインターフェースが重要でした。
多くの言語では、インターフェースと実装を別々に定義することが可能です。
例えば、Scalaではインターフェースは trait として定義し、実装はその trait を引き継いた class のなかで定義されます。
こうしてインターフエイスと実装を厳密に分離しています。

ただ残念なことに JavaScriptには抽象データ型のインターフェースだけを分離して定義する方法がありません。
必ず同時にデータ型の詳細も実装しなければならないのです。
それにもかかわらず、プログラムの設計段階でインターフェースと実装を頭のなかで分離することは重要です。◆◆◆宿題　この2文、ちょっと難しいので、例か図で説明しませんか？◆◆◆
なぜならばインターフェースと実装の分離は高いモジュール性を実現するからです。
そして高いモジュール性は分業を可能にして大規模プログラミングへの道を開きます。
また、コードの独立性が向上するので単体テストが容易になるという利点もあります。

#@# これは必ずインターフェースを介してデータを操作しなければならないからです。
#@# データ構造を操作する側はインターフェースだけ知っていれば十分であり、内部の詳細を知る必要はありません。
#@# 一方でデータ構造を実装する側はインターフェースだけ維持していれば、内部の詳細を自在に変更できます。
#@# そこで、データ構造を利用する側とデータ構造を実装する側の分業が可能になります。
#@# もし複数人での開発体制でなくても、モジュール性の高いプログラムは相互の依存性が減少するのでテストを書くのが容易になります。

#@# これだけならば、インターフェースが定義可能なJavaでも同じ利点を享受できます。
ところが抽象データ型の利点はこれだけにとどまりません。
抽象データ型の最大の特徴は、プログラムの論理的な検証を可能にするという点なのです。
例えば上記で定義されたリストの操作は、ある一定の法則に従います。
その法則は、 @<list>{list_algebraic_specification}です。
ここで小文字の記号はすでに定義済みの式を意味します。
一方でVALUE や LIST といった大文字の記号は、変数を意味します。
変数は証明したい式と厳密に一致している必要はありません。変数に適切な式を入れてそれが証明したい式と同一になればよいのです。
このルールは、データ型がリストとして振舞うかぎり必ず満さなければならない仕様です。
そこでこうしたルールを @<kw>{代数的仕様 algebraic specification} と呼びます。

//list[list_algebraic_specification][リストの代数的仕様]{
1) tail(cons(VALUE,LIST)) === LIST
2) head(cons(VALUE,LIST)) === VALUE
3) head(empty) === undefined
4) isEmpty(empty) === true
5) isEmpty(cons(VALUE,LIST)) === false
//}

この代数的仕様を使えば、プログラムの挙動を厳密に検証できます。
ここでは上記の代数的仕様を利用して、 @<code>{head(tail(cons(1,cons(2,empty)))) === 2} を証明しましょう。
証明は決して難しいものではありません。
@<code>{A === B} を証明したいとします。
Aの意味を変えることなくAを変形していき、最終的にそれがBへと変換されれば、@<code>{A === B}は証明できたことになります(@<img>{deduction})。

//image[deduction][証明の方法][scale=0.3]{
file://./images/chap04-deduction.png
//}


@<code>{head(tail(cons(1,cons(2,empty)))) === 2}の場合は、式の左辺を変形していって、右辺と同じ式になれば証明は成功です。
変形の際に利用するのが、リストの代数的仕様です。
#@# このとき、@<list>{list_algebraic_specification}と@<code>{head(tail(cons(1,cons(2,empty))))} を見比べながら、両者に似たパターンを探しつつ、式を変形していくだけです。


まず最初に、上記の代数的仕様の式とにらめっこして証明したい式の左側(@<code>{head(tail(cons(1,cons(2,empty))))}) と似たルールを探します。
すると、ルール 1) の(@<code>{tail(cons(VALUE,LIST)) = LIST})が @<code>{tail(cons(1,cons(2,empty)))}に似ていることに気付きます。
なぜならば、変数 VALUE を 1 と置き、同じく変数LISTを @<code>{cons(2,empty)} とすれば、両者が一致するからです。
さてこのとき ルール 1) が主張するのは、@<code>{tail(cons(VALUE,LIST))} が LISTになるということであり、ルールを適用するさいに変数LISTには @<code>{cons(2,empty)} を設定しました。
結局、もともと証明したい式 @<code>{head(tail(cons(1,cons(2,empty))))} は、ルール 1) を適用して @<code>{head(cons(2,empty))} という簡単な式に変形されました（@<img>{proof_first_half}）。

//image[proof_first_half][証明の前半][scale=0.3]{
file://./images/chap04-proof_first_half.png


//}


次に、新しく証明したい @<code>{head(cons(2,empty)) === 2} と代数的仕様のルールを見比べます。
すると、ルール 2) の @<code>{head(cons(VALUE,LIST)) = VALUE}と一致することがわかります。ただし、変数VALUEは 2に、変数LIST は empty に設定しなければなりません。
ところでルール 2)は @<code>{head(cons(VALUE,LIST))} が VALUE と同じであると主張していました。
ルールを適用する際に VALUE は 2 とおいたので、@<code>{head(tail(cons(1,cons(2,empty))))} は 2 になります。
これは証明したかった式の右辺と同じです。
以上より、@<code>{head(tail(cons(1,cons(2,empty)))) === 2} の証明は完了です（@<img>{proof_second_half}）。

//image[proof_second_half][証明の後半][scale=0.3]{
file://./images/chap04-proof_second_half.png

//}

この証明だけでは、「@<list>{list_as_abstract_type}の単体テストと変らないばかりか、かえって煩雑だ」と思うかも知れません。
しかし、代数的仕様による論理的な検証はテストよりもずっと汎用的です。
テストでは具体的な事例しか検証できません。
@<list>{list_as_abstract_type}では @<code>{head(tail(cons(1,cons(2,empty)))) === 2} という具体例でした。
ところが代数的仕様による検証では、これを一般化して @<code>{head(tail(cons(X,cons(Y,empty)))) === Y} をも検証できます。
ここで X や Y は変数です。
証明の流れは全く変りませんので、是非確かめてみてください。



==={mutablity} JavaScriptにおける合成型の可変性

#@# 関数型プログラミングの観点から問題となるのは、JavaScriptの合成型が可変なデータ構造という点です。

データには更新が可能な可変なデータと更新が不可能な不変なデータがありました(@<hd>{chap02|mutable_data})。
この可変性は型を考えたときにすでに決まっており、合成型は可変なデータ構造として設計されています。
つまり合成型はその要素を変更することが可能であり、いったん作られたあとでデータの中身が変更できます。
@<list>{array_is_mutable} では、2行目でデータの中身を書きかえたたため、元の配列とは等しくなりません。
なお、このテストで比較するための条件が @<code>{to.be} ではなく、@<code>{not.to.be}となっている点に注意してください。
この場合は実際の値と期待する値とが違う場合に、テストが成功します。

//listnum[array_is_mutable][配列型の可変性]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, array_is_mutable)
        var array = [0,1,2,3];
        array[0] = 7; // 配列の一部を書きかえている
        expect(
          array
        ).not.to.eql(
          [0,1,2,3] // [7,1,2,3]に変更されている
        )
#@end
//}

この例では配列の一部を書きかえていることは、  @<code>{array[0] = 7} というコードから明らかです。
ところが厄介なことに、JavaScriptではこの可変な操作を暗黙のうちに実行するメソッドがいくつか存在します。
このようなメソッドが使われた場合、データの一部が変更されたことが不明瞭です。
例えば、配列の要素を逆転させる Array.reverseメソッドはその一つです(@<list>{destructive_reverse})。
こうしたメソッドを不注意に使用すると、知らないあいだにデータの一部が書きかえられてしまうことになるのです。
こうしたメソッドは、@<kw>{破壊的メソッド}と呼ばれます。

//listnum[destructive_reverse][配列の破壊的メソッド]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, destructive_reverse)
        var array = [1,2,3,4,5];
        expect(
          array.reverse()
        ).to.eql(
          [5,4,3,2,1]
        );
        expect(
          array
        ).to.eql(
          [5,4,3,2,1] // array変数の中身が変更されている
        );
#@end
//}

#@# //cmd{
#@# node> var array = [1,2,3];
#@# undefined
#@# node> array.reverse();
#@# [ 3, 2, 1 ]
#@# node> array
#@# [ 3, 2, 1 ]
#@# //}


ここで破壊的な操作を許容しないように、試しにreverse関数を定義しなおしてみましょう(@<list>{immutable_reverse})。
reverse関数の詳細は後述するとして、再定義されたreverse関数では元の配列を破壊していません。

//listnum[immutable_reverse][不変なreverse関数]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, immutable_reverse)
        var reverse = (array) => {
          return array.reduce((accumulator, item) => {
            return [item].concat(accumulator);
          }, []);
        };
        var array = [1,2,3,4,5];
        expect(
          reverse(array)
        ).to.eql(
          [5,4,3,2,1]
        );
        expect(((_) => {
          var reversed = reverse(array);
          return array
        })()).to.eql(
          [1,2,3,4,5] // 元の配列と同じ
        );
#@end
//}


ところがこれでもデータ構造の不変性を保証するには十分ではありません。
なぜならば、返ってきた配列はやはり可変なデータ構造なのです。
そのため、返ってきた配列の一部を変更できてしまいます(@<list>{immutable_reverse_is_not_immutable})。
このように合成型の場合、可変性を回避することは残念ながら不可能なのです。

//listnum[immutable_reverse_is_not_immutable][不変なreverse関数は完全には不変でない]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, immutable_reverse_is_not_immutable)
        var reversed = reverse(array);
        reversed[0] = 0;
        expect(
          reversed
        ).to.eql(
          [0,4,3,2,1]
        );
#@end
//}


#@# 次章では、配列などの合成型が可変なデータ構造になる仕組みを解説していきます。



=={variable} 変数とデータの関係

データは変数のなかに格納されます。
このように表現すると、あたかも変数が容器のようにデータを包みこんでいるように聞こえますが、実はそうではありません。
変数はデータを格納しているのではなく、データを指し示しているのです。
それは街中に立っている案内板ようなものです。
例えば、美術館の案内板は美術館の場所を指し示していますが、美術館自体を格納しているわけではありません。
また美術館への案内板は、街中のいたるところに立っているわけではありません。
この比喩は、変数のもつ2つの性質を暗示しています。
それは、変数のバインディングとスコープです。



==={binding} 変数のバインディング


@<code>{var number = 3} は「変数 number が値3にバインドされている」ことを意味します。
変数にバインドされた値は、その変数名で参照できます。
例えば @<list>{variable_binding_value}では、1行目でbound変数に文字列 "バインドされた値"という文字列がバインドされています。
このように何らかの値にバインドされた変数を「バインド変数」といいます。
一方でなんの値にも束縛されていない変数は「自由変数」と呼びます。
@<list>{variable_binding_value}では、9行目の unbound変数が自由変数です。
JavaScriptでは自由変数にアクセスすると ReferenceError というエラーが返ります。


//listnum[variable_binding_value][自由変数とバインド変数]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, variable_binding_value)
        var bound = "バインドされた値";
        expect(
          bound
        ).to.be(
          "バインドされた値"
        );
        expect(
          (_) => { // 例外をキャッチするにはexpectに関数を渡します
            unbound // ここで自由変数にアクセスします
          }
        ).to.throwException((exception)=> {
          expect(exception).to.be.a(
            ReferenceError
          );
        });
#@end
//}

変数は関数本体でも利用されます。
それでは関数内部の変数のバインディングはどうなっているでしょうか。
引数に登場している変数が関数本体でも利用されている場合、その変数はバインド変数です。
例えば、@<list>{bound_variable_in_function} で定義されたadd関数ではその本体に変数xと変数yが登場しています。
これらの変数はadd関数の引数でもあるので、いずれもバインド変数です。

//listnum[bound_variable_in_function][関数本体でのバインド変数]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, bound_variable_in_function)
        var add = (x,y) => {
          return x + y; // x も y もバインド変数
        };
#@end
//}

一方、@<list>{free_variable_in_function} で定義されたadd関数では事情が異なります。
変数x はadd関数の引数でもあるのでバインド変数です。
一方で、変数yは関数本体に登場していますが関数の引数には見当りません。
そこで変数yは、add関数の中では自由変数になります。

//listnum[free_variable_in_function][関数本体での自由変数]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, free_variable_in_function)
        var add = (x) => {
          return x + y;  // x はバインド変数だが、y は自由変数
        };
#@end
//}

変数yが自由変数であることをテストで確認してみましょう。
@<list>{free_variable_in_function_test}にあるように、関数本体で変数yにアクセスされることによって ReferenceError となってしまいます。

//listnum[free_variable_in_function_test][関数本体での自由変数のテスト]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, free_variable_in_function_test)
        expect(
          (_) => {
            add(1,2)
          }
        ).to.throwException((exception)=> {
          expect(exception).to.be.a(
            ReferenceError
          );
        });
#@end
//}

それでは、評価されると ReferenceError を返すような関数を一体どのように利用するのでしょうか。
それを理解するために、次節にて変数のスコープを見ていきます。


==={scope} 変数のスコープ

#@# 変数の役割を説明するのに案内板の例えを出しました。
ある休日に、友人や恋人と一緒に美術館に向っているとしましょう。
あいにくスマートフォンのバッテリーが切れてしまい、GPSによるナビゲーションが使えません。
やむをえず美術館への案内板を辿って美術館への道順を探ります。
ただし案内板は駅から美術館へ向う道中には立っているかも知れませんが、全然的外れのエリアに入ってしまうと見当らなくなってしまいます。
案内板は街中のいたるところに立っているわけではないのです。
これと同じように、バインド変数も一定の範囲内にあるときに限って対応するデータを指し示します。
このバインディングが有効な範囲を「スコープ」といいます。

#@# バインド変数に対応するデータはその変数名で取得できました。
#@# ところが全ての場合において変数に対応するデータを取り出せるわけではありません。
#@# 変数のバインディングには有効範囲があるからです。
#@# この変数の有効期間を「スコープ」といいます。

最も有効範囲の広いスコープを「大域スコープ」と呼びます。
大域スコープでは、そのプログラムが実行されているあいだ、どこからでも変数が参照可能です。
例えば、varキーワードを付けずに定義された変数や、Mathオブジェクトなどの大域オブジェクトはこの大域スコープに属しています。

一方で、有効範囲の限定されたスコープは「局所スコープ」と呼びます。
局所スコープのなかで定義された変数は、そのスコープの内部でのみ参照できます。
有効範囲を外れると自由変数になるので、その変数にアクセスすると ReferenceError が返ります。

そしてJavaScriptで局所スコープを作りだすものは、関数です。
@<list>{function_creates_scope}は関数がスコープを作りだす様子を表わしたものです。
createScope関数は内部に新しい局所スコープを作ります。
そのなかで定義されている innerScope変数はcreateScope関数のなかでのみ利用できます。
したがって、スコープの外側からアクセスされると ReferenceError となります。

//listnum[function_creates_scope][関数によるスコープ]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, function_creates_scope)
        var createScope = (_) =>  {
          var innerScope = "inner"; // innerScope変数は createScopeの中でのみ有効
          return innerScope;
        }
        expect(
          (_) => {
            innerScope // 関数内の局所スコープにある変数にアクセスを試みます
          }
        ).to.throwException((e)=> {
          expect(e).to.be.a(
            ReferenceError
          );
        });
#@end
//}

スコープは、そのなかにスコープを作って入れ子にできます。
このとき外側のスコープから内側のスコープにはアクセスできませんが、内側のスコープからは外側のスコープにはアクセスできます。
これはあたかもマジックミラーでできた小部屋がいくつも重なっているような構造です(@<img>{function_scope})。
内側にいる人は外側にいる人が見えます。
そこで、createScope関数で作成された局所スコープのなかから、外側にある outerScope変数にアクセスすることができます(@<img>{function_scope})。

//image[function_scope][スコープ][scale=0.4]{
file://./images/chap04-function_scope.png
//}


関数の中に関数を定義し、スコープを入れ子にすることも可能です。
前節 @<hd>{chap04|variable|binding} にて、関数定義のなかで自由変数となる場合を見ました(@<list>{free_variable_in_function})。
このadd関数の外側にもうひとつadderという関数をかぶせてみましょう(@<list>{binding_in_closure})。
その際に、内側の関数で自由変数となっていた y を外側の関数の引数とします。
すると、それまで自由変数であったはずの変数yは、adder関数の引数にバインドされるバインド変数にかわります。


//listnum[binding_in_closure][クロージャーのバインディング]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, binding_in_closure)
        var adder = (y) => { // 外側の関数
          var add = (x) => { // 内側の関数
            return x + y;
          };
          return add;
        };
#@end
//}

入れ子になった関数を適用するには、引数を別々に指定しなければなりません。
上記のadder関数では、例えば @<code>{adder(2)(3)}とします。
このときadder関数の引数yには2が渡り、内側のadd関数の引数xには3が渡されます(@<list>{binding_in_closure_test})。
これでadd関数内のいずれの変数もバインド変数なので ReferenceError にはなりません。

//listnum[binding_in_closure_test][クロージャーのテスト]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, binding_in_closure_test)
        expect(
          adder(2)(3)
        ).to.be(
          5
        );
#@end
//}


実は@<list>{binding_in_closure}の内側で定義されているadd関数は、関数型プログラミングで@<kw>{クロージャー}と呼ばれるものです。
一見すれば自由変数に見えたクロージャ内部の変数が実は外側のスコープでバインドされる仕組みは、今まで説明から明らかです。
クロージャーについては、@<hd>{chap07|closure}で再度取りあげることにします

=={referential_transparency} 参照透過性の仕組み

#@# @<href>{http://plato.local:9295/v/304?query=referential+transparency&page=157,Scala in Action(p.157)}
#@# @<href>{http://plato.local:9295/v/133?query=referential+transparency&page=286, Functional Programming in Scala(p.286)}
#@# @<href>{http://plato.local:9295/v/93?query=referential+transparency&page=5, Conception Evolution and Application of Functional Programming Languages(p.5)}

日常生活において、私たちは外見が同じものは中身も同じであると考えます。
現代社会においてその最たる例は、お金です(@<hd>{chap02|referential_transparency})。
私たちは手元にある100円玉を見て、それがどの100円玉であろうと同じ100円であると考えています。
この捉え方は関数型プログラミングや数学の世界でも同じです。
同じコンテキストにおいてそっくり同じに表現された対象は、同じものと判断されます。
例えば、10は10と同一です(進数というコンテキストが一緒であれば)。

ところが驚くべきことに命令型プログラミングの世界では必ずしもこの常識が通用しません。
つまり、見た目がそっくり同じであっても、異なるデータとして判断される場面があるのです。
以下はその典型的な実例です。
10 と 10 は同じデータと判断されている一方で、@<code>{[1,2,3]} と @<code>{[1,2,3]} は違うデータと判断されています。

//cmd{
node> 10 === 10
 =>
true

node> [1,2,3] === [1,2,3]
 =>
false
//}


こうした違いが生まれるのは、データを同一であると判断する条件(同値性)がそれぞれのデータの可変性で異なるからです。
それではなぜデータ型の可変性によって === が異なる結果になるのでしょうか。
その区別を明らかにするにはシンタックス（構文）の世界ではなく、目には見えないセマンティクス（意味）の世界を覗きこまなければなりません。


==={environment} 不変なデータの仕組み

JavaScriptにおいて、不変なデータとは基本型に属するデータです。
不変なデータは、見た目が同じならば両者は同一です(@<list>{basic_type_is_value_type})。

//listnum[basic_type_is_value_type][基本型は値としてのデータである]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, basic_type_is_value_type)
        var n = 1;
        expect(
          n
        ).to.be(
          1
        )
        var s = "hello"
        expect(
          s
        ).to.be(
          "hello"
        )
#@end
//}

この不変なデータへの変数のバインディングはどのように実現されているのでしょうか。
それは、セマンティクスの世界で環境と呼ばれる仕組みで実現されています(@<hd>{chap03|semantics})
「環境」とは一種の辞書であり、変数名とそれに対応するデータの対応を保存しています。
例えば、変数number に1 を、変数boolに true を対応させた環境は、次のように表現されます。

//texequation{
		\{ number \mapsto 1, bool \mapsto true \}
//}

#@# //listnum[environment_example][環境の例]{
#@# var x = 1;
#@# var y = 2;
#@# //}


この「環境」という辞書は、メモリーの内部に作成されます。
例えば@<code>{var n = 1; var bool = true;} というコードがあれば、セマンティクスの世界ではメモリー内に変数とデータの対応が作成されます(@<img>{environment_plain})。
この対応はあたかもオブジェクト型のキーと値の対応に似ています。
オブジェクト型では、キーと値は1対1に対応していました。
つまり、同じキーを2つ以上持つことはできず、ひとつのキーが2つ以上の値を持つことはできません。
環境もこれと同じです。
そのため、あるスコープのなかでは同じ変数を重複して定義することはできません。


//image[environment_plain][環境の存在][scale=0.5]{
file://./images/chap04-environment_plain.png
//}


#@# 環境にある情報を利用すれば、変数名から対応するデータを取りだすことができます。
#@# 変数から値を取得するには環境を用います。


一方で環境はオブジェクト型と異なる重要な性質があります。
環境においていったん作られた変数と値の対応は、同じスコープのなかでは変更できないという性質です。
環境の持つこの性質が不変なデータを変更不可能にしているのです。
#@# 逆に言えば、この環境を利用して変数が対応するデータを取得できる範囲が、前述したスコープになるのです。


#@# 同じ名前の変数を何度も定義することは可能です。
#@# @<list>{nested_environment_example}では変数xが2回定義されています。
#@# ただし、その際はスコープのレベルが異なる必要があります。
#@# それは環境の実装(@<list>{environment_implemented})から明らかです。


==={reference} 可変なデータの仕組み

さて次に、JavaScriptにおいて可変なデータは合成型のデータでした。
可変なデータは変更可能であるとともに、見た目の同一性とデータの同一性が一致しないという特徴があります(@<list>{complex_type_is_reference})。
例えば、2行目の[0,1,2,3]と4行目の[0,1,2,3]は、@<code>{not.to.be} で比較しているので両者は同値ではありません。

//listnum[complex_type_is_reference][合成型は参照としてのデータである]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, complex_type_is_reference)
        var array = [0,1,2,3];
        expect(
          array
        ).not.to.be(
          [0,1,2,3]
        )
        var object = { key: 1 };
        expect(
          object
        ).not.to.be(
          {
            key: 1
          }
        )
        var func = (_) => { return 1; };
        expect(
          func
        ).not.to.be(
          ((_) => { return 1; })
        )
#@end
//}


可変なデータを実現するには前述の「環境」という仕組みだけでは不十分です。
それは、環境における変数と値の対応が変更できないことから明らかです。
可変なデータを実現するには、環境に加えてさらに「記憶域」と呼ばれる仕組みを導入しなければなりません。

記憶域とは、メモリー上のアドレスとそのアドレスが指すデータの対応を保持する仕組みです。
計算機内部にあるメモリーは、配列のような構造をしています。
つまりメモリーはデータを格納する小さな箱がいくつも並んだ構造をしており、それぞれの箱にはその位置を示すアドレスが振られています。
可変なデータの場合には、そのアドレスを格納する領域が準備されています。
そして可変なデータが生成されるとデータ自身ではなく、そのデータが格納されたメモリー上のアドレスが返るのです@<fn>{アドレスの値}。

//footnote[アドレスの値][JavaScriptではアドレスの具体的な値を知ることはできません。ポインターを介してメモリーを直接操作できるC言語ならば、それが可能です。]

可変なデータが記憶域に格納されてそのアドレスが返る様子を図示したのが、@<img>{reference_type} です。
最初に@<code>{[1,2,3]}という配列を作ります。
すると配列のデータがメモリー上のある場所に格納され、そのアドレスが返ってきます。そのアドレスを仮に 1001 としましょう。
ここでもう一度 @<code>{[1,2,3]}の配列を作ります。
するとメモリー上の別の場所にこのデータが生成され、そのアドレスが返ってきます。
この配列は最初の配列とは別の場所に作られるので、返ってくるアドレスも違うものとなります(仮に1010としましょう)。
#@# 両者は違うアドレスを持つデータなので、異なるデータと判定されてしまうのです。


//image[reference_type][参照としてのデータ][scale=0.5]{
file://./images/chap04-reference_type.png

//}


なぜこのような面倒な仕組みをあらたに導入する必要があるのでしょうか。
それは、データの中身を書きかえるためにほかなりません。
不変なデータでは生成されると値そのものが返ってくるので、その中身を変更することはできません。
一方で、可変なデータは生成されるとその中身が格納されているアドレスが返ってきます。
しかも、可変なデータは内部に構造をもった合成型でした。
そこで、アドレスの情報を頼りに構造の一部を変更することが可能になるのです。

可変なデータと不変なデータとで、同値性の判断が異なるのもこの仕組みに関係しています。
可変なデータでは、返ってきた値そのものを直接比べることができます。
そのため、2つのデータがいずれも同じ内容を持っているとき、2つのデータは同一と判断できます。
ところが可変なデータではアドレスの情報しかありません。
そこで可変なデータの同値性は、それらのメモリー上のアドレスが一致するかどうかという点だけで判断するしかないのです。
つまり、見た目が同一であってもメモリー上の番地が一致しなければ、2つのデータは異なるものと判定されるのです。

#@# 不変なデータは、2つのデータがいずれも同じ内容を持っているとき、2つのデータは同一です。
#@# 一方で、可変なデータは、メモリー上の番地が一致するときにかぎって、2つのデータは同一と判定されます。
#@# 見た目が同一であってもメモリー上の番地が一致しなければ、2つのデータは異なるものと判定されるのです。


==={assignment} 代入の仕組みと効果

環境における変数と値の対応は、同じスコープにおいては重複を許さないものでした。
つまり、いったん形成された変数とデータの対応を変更することはできません。
ところがJavaScriptをはじめとした多くの命令型言語では、変数とデータとの結びつきを解消してあらためて別のデータと結びつくことが可能になっています。
このように変数が示すデータを変更する操作を、特に「代入」と呼びます。

この代入の仕組みは、ある観点からは便利な機能です。
なぜならば外界の変化に応じてプログラムの結果を更新することが可能になるからです。
例えば上記の例では、29歳のアロンゾ・チャーチ氏が誕生日を迎えて30歳になると、その時点での年齢に応じてage変数を30に更新できます(@<list>{assign_to_variable})。

//listnum[assign_to_variable][変数への代入]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, assign_to_variable)
        var age = 29;
        expect(
          age
        ).to.be(
          29
        );
        // この時点で誕生日を迎えました
        age = 30;
        expect(
          age
        ).to.be(
          30
        );
#@end
//}


この代入という操作を実現するには、可変なデータを生成するときに準備した記憶域の仕組みが必要となります。
例えば、@<list>{assignment_example}という疑似コードを考えてみましょう。
このコードの最初の行(@<code>{var x = A;})が実行される裏側では、 @<img>{assignment01}のように記憶域とメモリーが操作されます。
つまり、Aという値がメモリー上に配置され、そのアドレスが変数xに対応付けられます。


//listnum[assignment_example][変数への代入]{
        var x = A;
        x = B;
//}

#@# //listnum[assignment01][変数への代入]{
#@#         var x = 10;
#@# //}

//image[assignment01][代入の仕組み][scale=0.4]{
file://./images/chap04-assignment01.png

//}

#@# 次に@<code>{x = 20;}というコードと追加して @<list>{assignment02}としてみます。

#@# //listnum[assignment02][変数への代入]{
#@#         var x = 10;
#@#         x = 20;
#@# //}


次に@<code>{x = B;}という代入が実行されます。
このとき、あらためて B という値がメモリー上に配置され、以前のアドレスを破棄して新しいアドレスが変数xに対応付けられます。
その結果、変数xはBを指し示すことになります。
このように代入を実現するには、アドレスを保持するための記憶域の存在が不可欠なのです。


//image[assignment02][代入の仕組み][scale=0.4]{
file://./images/chap04-assignment02.png

//}



=== 参照透過性を成立させる条件

関数型プログラミングにおける計算の原理は、関数型モデルにおける置換ルールでした(@<hd>{chap01|functional_model})。
置換ルールとは、@<m>{f(x) = 2 \times x + 1} という関数があったとき、@<m>{f(2)} を計算するには関数本体である@<m>{2 \times x + 1} に出現する変数xを2で置換するというものでした。
この置換ルールには重要な前提があります。
それは、もし@<code>{A = B}ならば「AとBは等しくなければならない」という要請です。
どうしてこれが重要な前提かというと、上記の置換が正常に動作するためには @<code>{x = 2}ならば @<m>{2 \times x + 1} に出現する変数xを必ず2に置換しなければならないからです。
同じように @<code>{2 = 2} でなければならず、@<code>{1 = 1} でなければなりません。
この要請は、関数型プログラミングの用語で@<kw>{参照透過性}といいます。
ところがこの要請は、プログラミングの世界では必ずしも当然には成立しないことを見てきました。
本章の最後として、これらの論点と関数型プログラミングとの関係を明らかにし、JavaScriptで参照透過性を成立させる条件を探ります。


#@# 参照透過性は関数型プログラミングの中心となる性質でした(@<hd>{chap02|functional_programming|referential_transparency})。
#@# そして関数型プログラミングは関数型モデルを前提にしています(@<hd>{chap01|functional_model})。
#@# 参照透過性はその関数型モデルを実現するために不可欠です。
#@# なぜならば参照透過性があって初めて関数型モデルの置換ルールが可能になるからです。
#@# この節では、参照透過性とデータの関係について探ります。


不変なデータでは、AとBの見た目が同じならば両者は同値と判定されました。
つまり、@<code>{A=B} がそのまま「A と B が等しい」ことを意味します。
そこで、例えば @<code>{var z = x + y;} というコードがあるとします。
このコードが「zは @<code>{x + y}と等しい」ことを意味すれば、他の場所に出現した@<code>{x + y} をzに置換することができるはずです。
実際に、下記の @<code>{(x + y) * (x + y)} において @<code>{(x + y)} を z に置換しても結果は変りません(@<list>{referential_transparency_example})。
すなわち、不変なデータは参照透過性を持ちます。

//listnum[referential_transparency_example][参照透過性がある場合]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, referential_transparency_example)
      var x = 1;
      var y = 2;
      var z = x + y;
      expect(
        (x + y) * (x + y)
      ).to.be(
        z * z // (x + y) を z に置きかえた
      );
#@end
//}

一方で可変なデータでは、AとBの見た目が同じあっても両者は別の値と判定されました。
つまり @<code>{A=B} であっても必ずしも「A と B が等しい」という等式にはなりません。
すると@<code>{A=B}であっても、AをBに置換することができなくなります。
配列は可変なデータ構造です。
したがって、@<code>{var z = [x,y]} とされていても、zは必ずしも@<code>{[x,y]}とは同じデータにはなりません(@<list>{referential_transparency_counterexample_mutable})。
すなわち、可変なデータは参照透過性を持ちません。

//listnum[referential_transparency_counterexample_mutable][参照透過性がない場合]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, referential_transparency_counterexample_mutable)
      var x = 1;
      var y = 2;
      var z = [x,y];
      expect(
        [x,y]
      ).not.to.be( // notを使っている
        z // [x,y] を z に置きかえた
      );
#@end
//}

ここまでの話では可変なデータさえ利用しなければ参照透過性は保たれるように思えます。
しかし、そうではありません。
例え不変なデータであっても代入によって参照透過性を失なうのです。
その事実を表したのが @<list>{assign_to_basic_value}です。
ここのコードは全て同じスコープの中にあります。
ところが、そのスコープ内において @<code>{basic_value === 1} と @<code>{basic_value === 3}が同時に成立しています。
両方の式を合体させると @<code>{1 = 3} となりますが、これが等式として間違っていることは明らかです。


//listnum[assign_to_basic_value][基本型への代入]{
#@maprange(vendor/functionaljs/test/chap04.spec.js, assign_to_basic_value)
        var basic_value = 1;
        expect(
          basic_value
        ).to.eql(
          1
        );
        basic_value = 3;
        expect(
          basic_value
        ).to.eql(
          3
        );
#@end
//}

#@# @<list>{assign_example}のコードを見てください。
#@# もしここで使われた = が等式ならば、@<code>{x = 10 = 20} という奇妙な結果になります。
#@# なぜならば、@<code>{x = 10} で@<code>{x = 20} ならば @<code>{10 = 20} となるはずだからです。
#@# これは =という記号がもはや等式を表現しているのではないことを表わしています。

#@# //listnum[assign_example][代入の例]{
#@#         var x = 10;
#@#         x = 20;
#@# //}



#@# ところが代入という操作が可能になれば、いずれのデータも

#@# 合成型への代入

#@# //listnum[assign_to_complex_value][合成型への代入]{
#@# #@maprange(vendor/functionaljs/test/chap04.spec.js, assign_to_complex_value)
#@# 		var object = {one: 1, two: 2}
#@# 		expect(
#@#           object.one
#@# 		).to.eql(
#@#           1
#@# 		);
#@# 		object.one = 3;
#@# 		expect(
#@#           object.one
#@# 		).to.eql(
#@#           3
#@# 		);
#@# #@end
#@# //}


#@# いずれの場合にも===による同値性が成立しません。


#@# ところが関数型プログラミングの観点からは、記憶域の導入によって重要な問題が浮上します。


以上からわかることは、可変なデータや代入のためにいったん記憶域を導入すればコードの参照透過性が失なわれてしまうという事実です。
その理由は、コードにおいて等式が成立しなくなるからです。
その原因をさらに遡ると、記憶域のアドレスを介して変数とデータを対応付けたときに変数と値との直接の対応が失なわれてしまうことに由来します。
「参照透過性」という用語はこの様子を表現したものです。
すなわち参照透過な値は変数と直接結びついているので変数から参照先の値がはっきりと見えます。
一方で参照不透明なデータはアドレスを介して値と間接的に結びつくため、参照先の値が直接には見えないのです。

以上よりJavaScriptにおいて参照透過性を成立させる条件が明らかになりました。
それは、次の二点です。

 * 1.不変なデータのみを使うこと。
 * 2.代入を使わない。

関数型プログラミングでは、関数を活用することによりこの問題に対処します。
それは次章以降で、順次紹介していきます。

