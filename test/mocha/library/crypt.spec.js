"use strict";

const expect = require('expect.js');


describe("cryptライブラリ", () => {
  const crypto = require("crypto");
  const source ='59be0b0726c7170dcf2862f8';

  describe('md5でハッシュ値を計算する', () => {

    it('hexでダイジェストを計算する', (next) => {
      var md5 = crypto.createHash('md5');
      md5.update(source)
      expect(
        md5.digest('hex')
      ).to.eql(
        'f10fecf2eed882cfcf15498837f182ed'
      );
      next();
    });
    // it('binaryでダイジェストを計算する', (next) => {
    //   var md5 = crypto.createHash('md5');
    //   md5.update(source)
    //   expect(
    //     md5.digest('binary')
    //   ).to.eql(
    //     'f10fecf2eed882cfcf15498837f182ed'
    //   );
    //   next();
    // });
    it('base64でダイジェストを計算する', (next) => {
      var md5 = crypto.createHash('md5');
      md5.update(source)
      expect(
        md5.digest('base64')
      ).to.eql(
        '8Q/s8u7Ygs/PFUmIN/GC7Q=='
      );
      next();
    });
  });
  describe('DSAでハッシュ値を計算する', () => {

    it('hexでダイジェストを計算する', (next) => {
      var DSA = crypto.createHash('DSA');
      DSA.update(source)
      expect(
        DSA.digest('hex')
      ).to.eql(
        'f048425269dd1a8e9fd6bcdf0de7132e418980f6'
      );
      next();
    });
  });
  describe('sha1でハッシュ値を計算する', () => {

    it('hexでダイジェストを計算する', (next) => {
      var sha1 = crypto.createHash('sha1');
      sha1.update(source)
      expect(
        sha1.digest('hex')
      ).to.eql(
        'f048425269dd1a8e9fd6bcdf0de7132e418980f6'
      );
      next();
    });
    it('base64でダイジェストを計算する', (next) => {
      var sha1 = crypto.createHash('sha1');
      sha1.update(source)
      expect(
        sha1.digest('base64')
      ).to.eql(
        '8EhCUmndGo6f1rzfDecTLkGJgPY='
      );
      next();
    });
  });

  describe('sha512でハッシュ値を計算する', () => {

    it('hexでハッシュ値を計算する', (next) => {
      var sha512 = crypto.createHash('sha512');
      sha512.update(source)
      expect(
        sha512.digest('hex')
      ).to.eql(
        '2d0738177813090b31dd4554e7ff31ebdf283f54e07b2016543f15e0392098705f4e2d455eae48e9296b0bff476fc04901e754dbb8a3fb602c3785fff91278f8'
      );
      next();
    });
    it('latin1でハッシュ値を計算する', (next) => {
      var sha512 = crypto.createHash('sha512');
      sha512.update(source)
      expect(
        sha512.digest('base64')
      ).to.eql(
        'LQc4F3gTCQsx3UVU5/8x698oP1TgeyAWVD8V4DkgmHBfTi1FXq5I6SlrC/9Hb8BJAedU27ij+2AsN4X/+RJ4+A=='
      );
      next();
    });
  });
});
