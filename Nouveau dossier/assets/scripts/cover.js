export class sceneCover extends Phaser.Scene
{
    constructor(){
        super('sceneCover');
        this.click = false;
    }
    preload(){
        this.load.image('cover','assets/cover.png');
    }
    create(){
        this.add.image(320,200,'cover');
        this.cameras.main.zoom= 1;

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if (this.cursors.space.isDown)
			this.click = true;
        
            if (this.click == true)
		{
			this.cameras.main.fadeOut(900, 0, 0, 0);
			this.time.delayedCall(1000, () => {
				this.scene.start('sceneRue');
			})
		}
        this.click = false;
    }
    
};