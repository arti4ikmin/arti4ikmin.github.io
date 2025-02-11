document.addEventListener('DOMContentLoaded', () => {
  const inp = document.querySelectorAll('input, select');
  inp.forEach(input => {
    input.addEventListener('input', updQuery);
  });
  updQuery();
});

function updQuery() {
  const params = [];
  const author = document.getElementById('author').value.trim();
  const mentions = document.getElementById('mentions').value.trim();
  const has = document.getElementById('has').value;
  const before = document.getElementById('before').value;
  const during = document.getElementById('during').value;
  const after = document.getElementById('after').value;
  const channel = document.getElementById('channel').value.trim();
  const pinned = document.getElementById('pinned').value;

  if (author) params.push(`author_id=${encodeURIComponent(author)}`);
  if (mentions) params.push(`mentions=${encodeURIComponent(mentions)}`);
  if (has) params.push(`has=${encodeURIComponent(has)}`);
  if (before) params.push(`max_id=${encodeURIComponent(dateToSnowflake(before))}`);
  if (during) params.push(`min_id=${encodeURIComponent(dateToSnowflake(during))}`);
  if (after) params.push(`min_id=${encodeURIComponent(dateToSnowflake(after))}`);
  if (channel) params.push(`channel_id=${encodeURIComponent(channel)}`);
  if (pinned) params.push(`pinned=${encodeURIComponent(pinned)}`);

  document.getElementById('output').value = params.join('&');
}

function dateToSnowflake(dateString) {
  // (assuming timestamp in milliseconds)
  const date = new Date(dateString);
  return (date.getTime() - 1420070400000) * 4194304;
}

function copyQuery() {
  const output = document.getElementById('output');
  output.select();
  document.execCommand('copy');
  alert('Query copied to clipboard!');
}