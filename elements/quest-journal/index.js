const questTrigger = document.getElementById('quest-trigger');
questTrigger.addEventListener('click', () => {
    questTrigger.innerHTML = '<p>skdfjsd lfjlksdj flksjdf lksdjfl ksdjlksdjflksdj</p><p>flksdjf lksdj fklsjdf lksdjf lksdjfksdjf lsdjlsdjflk dfklsd jflksdjf</p>';
});

fresco.onReady(function () {
    
    fresco.onStateChanged(function () {
        // TODO
    });
    
    fresco.initialize({}, { title: 'Quests' });
    fresco.autoAdjustHeight();
});


