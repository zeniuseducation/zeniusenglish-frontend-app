// Link JSON to documentArticle
var content = doc.getElementById('docContent');
if (content) {
  title.innerHTML = documentArticle.title;
  content.innerHTML = documentArticle.content;
}
