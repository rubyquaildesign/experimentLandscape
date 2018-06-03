import getC from './pallete';
import { getRandomInt } from './helperFuncs';
import firebase from '../../node_modules/firebase/index';
import vorManagement from './vorManagement';
/** @type {vorManagement} */
let vm = new vorManagement( {
  width: window.innerWidth,
  height: window.innerHeight,
  fillPC: 200
} );
export function preload() {}
export function setup() {
  createCanvas( window.innerWidth, window.innerHeight );
  background( getC( getRandomInt( 0, 12 ), getRandomInt( 2, 5 ) ).hex );
}

export function draw() {
  if ( frameCount % 20 === 5 ) vm.fSim.restart();
  background( getC( 5, 4 ).hex );
  if ( vm.activePoints.length > 1 ) vm.fSim.tick();
  vm.regenerateMesh();
  vm.relaxLikeLloyd();
  vm.activePoints.map( p => {
    let nx = ( p.x * 2 + p[0] ) / 3;
    let ny = ( p.y * 2 + p[1] ) / 3;
    p.x = nx;
    p.y = ny;
    p[0] = nx;
    p[1] = ny;
  } );
  let polygons = vm.outerPolys;
  polygons.map( ( poly, i ) => {
    let polyPoint = vm.outerMesh.cells[i].site.data;
    let c = polyPoint.class;
    fill( getC( c * 2, 3 ).hex );

    ellipse( polyPoint[0], polyPoint[1], 15 );
  } );
}

export function mousePressed() {
  vm.addActivePoint( mouseX, mouseY, 3, {} );
}