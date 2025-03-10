    async function writeClipboardText(text, songid) {
        let addtoclipboard = document.getElementById(`div-song-share-btn-${songid}`);
        try {
          await navigator.clipboard.writeText(addtoclipboard.innerHTML);
        } catch (error) {
          console.error(error.message);
        }
      }