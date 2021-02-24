function ParticleSystem(spec) {
    let that = {};
    let particles = [];

    that.center = spec.center;
    that.range = spec.range;
    that.isCreateNewParticles = spec.isCreateNewParticles;

    function create(spec) {
        let that = {};

        spec.fill = 'rgb(255, 255, 255)';
        spec.stroke = 'rgb(0, 0, 0)';
        spec.alive = 0;

        that.update = function(elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            spec.rotation += spec.speed * 0.5;

            return spec.alive < spec.lifetime;
        };

        that.draw = function() {
            //graphics.drawRectangle(spec);
            drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        };

        return that;
    }

    that.update = function(elapsedTime) {
        let keepMe = [];
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;

        function nextCircleVector(range) {
            let start = range.start;
            let end = range.end;
            let angle = Math.random() * (end - start) + start;

            return {
                x: Math.sin(angle),
                y: Math.cos(angle)
            };
        }

        if (that.isCreateNewParticles) {
            that.type = spec.type;
            if (that.type === "circle") {
                for (let particle = 0; particle < 5; particle++) {
                    let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
                    let p = create({
                        image: spec.image,
                        center: {x: spec.center.x, y: spec.center.y},
                        size: {x: size, y: size},
                        rotation: 0,
                        speed: Math.abs(Random.nextGaussian(spec.speed.mean, spec.speed.stdev)),
                        direction: nextCircleVector(spec.range),
                        lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
                    });
                    particles.push(p);
                }
            }
            else if (that.type === "square") {
                for (let particle = 0; particle < 5; particle++) {
                    let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
                    let x = 0;
                    let y = 0;
                    let randomDirection = Math.random();
                    if (randomDirection < 0.5) {
                        x = 0;
                        if (randomDirection > 0.25) {
                            y = -1;
                        }
                        else {
                            y = 1;
                        }
                    }
                    else {
                        y = 0;
                        if (randomDirection > 0.75) {
                            x = -1;
                        }
                        else {
                            x = 1;
                        }
                    }

                    let centerX = spec.center.x;
                    let centerY = spec.center.y;
                    //up
                    if (x===0 && y===-1) {
                        centerY -= cellSize/2;
                        centerX += Math.random() * cellSize/2;
                        centerX -= Math.random() * cellSize/2;
                    }
                    //down
                    else if (x===0 && y===1) {
                        centerY += cellSize/2;
                        centerX += Math.random() * cellSize/2;
                        centerX -= Math.random() * cellSize/2;
                    }
                    //left
                    else if (x===-1 && y===0) {
                        centerX -= cellSize/2;
                        centerY += Math.random() * cellSize/2;
                        centerY -= Math.random() * cellSize/2;
                    }
                    //right
                    else if (x===1 && y===0) {
                        centerX += cellSize/2;
                        centerY += Math.random() * cellSize/2;
                        centerY -= Math.random() * cellSize/2;
                    }

                    let p = create({
                        image: spec.image,
                        center: {x: centerX, y: centerY},
                        size: {x: size, y: size},
                        rotation: 0,
                        speed: Math.abs(Random.nextGaussian(spec.speed.mean, spec.speed.stdev)),
                        direction: {x:x, y: y},
                        lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
                    });
                    particles.push(p);
                }
            }
        }
    };

    that.render = function() {
        for (let p = particles.length - 1; p >= 0; p--) {
            particles[p].draw();
        }
    };

    return that;
}

function drawTexture(image, center, rotation, size) {
    contextF.save();

    contextF.translate(center.x, center.y);
    contextF.rotate(rotation);
    contextF.translate(-center.x, -center.y);

    contextF.drawImage(
        image,
        center.x - 9 / 2,
        center.y - 14 / 2,
        9, 14);

    contextF.restore();
}
