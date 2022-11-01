export const RESET_HTML_TEMPLATE = (resetUrl: string) => {
  return `
    <div class="container" 
    style="
    width: 350px;
    height: 100px;
    text-align: center;
    font-size: 20px;
    color: #000;
    font-family: 'open sans', Arial, Helvetica, sans-serif;
    margin: 0 auto;">

        <p>Click the buttom to reset yor password:</p>
        <a 
        href="${resetUrl}" 
        class="link"
        style="text-decoration: none;
            background: #82acb6;
            color: #fff;
            padding: 10px;
            border-radius: 6px;">
            Reset
            </a>
    </div>`
}