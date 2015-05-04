/**
 * @Copyright:
 *
 * @Description:
 *  RDF tiples of type define. For now, only 6 kinds of type ( base, contact, document, pic-
 *  ture, music, video) are presented.
 *
 * @author: Xiquan
 *
 * @Data:2015.5.4
 *
 * @version:0.0.1
 **/


var _base = [{
  subject: 'http://example.org/category#base',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Class'
}, {
  subject: 'http://example.org/property/base#createTime',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/base#createTime',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/base#lastModifyTime',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/base#lastModifyTime',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/base#lastAccessTime',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/base#lastAccessTime',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/base#createDev',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/base#createDev',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/base#lastModifyDev',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/base#lastModifyDev',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/base#lastAccessDev',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/base#lastAccessDev',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#base'
}];

var _contact = [{
  subject: 'http://example.org/category#contact',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#subClassOf',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/contact#lastname',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#lastname',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#contact'
}, {
  subject: 'http://example.org/property/contact#firstname',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#firstname',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#contact'
}, {
  subject: 'http://example.org/property/contact#email',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#email',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#contact'
}, {
  subject: 'http://example.org/property/contact#phone',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#phone',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#contact'
}];

var _document = [{
  subject: 'http://example.org/category#document',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#subClassOf',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/contact#project',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#project',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#document'
}];

var _picture = [{
  subject: 'http://example.org/category#picture',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#subClassOf',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/contact#location',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#location',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#document'
}];

var _music = [{
  subject: 'http://example.org/category#music',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#subClassOf',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/contact#bit_rate',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#bit_rate',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#frequency',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#frequency',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#track',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#track',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#TDRC',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#TDRC',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#APIC',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#APIC',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#TALB',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#TALB',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#TPE1',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#TPE1',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#TIT2',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#TIT2',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#TXXX',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#TXXX',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}, {
  subject: 'http://example.org/property/contact#COMM',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#COMM',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#music'
}];

var _video = [{
  subject: 'http://example.org/category#video',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#subClassOf',
  object: 'http://example.org/category#base'
}, {
  subject: 'http://example.org/property/contact#format_long_name',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#format_long_name',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}, {
  subject: 'http://example.org/property/contact#width',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#width',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}, {
  subject: 'http://example.org/property/contact#height',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#height',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}, {
  subject: 'http://example.org/property/contact#display_aspect_ratio',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#display_aspect_ratio',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}, {
  subject: 'http://example.org/property/contact#pix_fmt',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#pix_fmt',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}, {
  subject: 'http://example.org/property/contact#duration',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#duration',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}, {
  subject: 'http://example.org/property/contact#major_brand',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#major_brand',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}, {
  subject: 'http://example.org/property/contact#minor_version',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#minor_version',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}, {
  subject: 'http://example.org/property/contact#compatible_brands',
  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  object: 'http://www.w3.org/2000/01/rdf-schema#Property'
}, {
  subject: 'http://example.org/property/contact#compatible_brands',
  predicate: 'http://www.w3.org/2000/01/rdf-schema#domain',
  object: 'http://example.org/category#video'
}];



exports.vocabulary = {
  base: _base,
  contact: _contact,
  document: _document,
  picture: _picture,
  music: _music,
  video: _video
};