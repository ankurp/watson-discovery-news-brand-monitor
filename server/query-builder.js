module.exports = {
  setEnvironmentId(environmentId) {
    this.environment_id = environmentId;
  },
  setCollectionId(collectionId) {
    this.collection_id = collectionId;
  },
  search(queryOpts) {
    const params = Object.assign({
      environment_id: this.environment_id,
      collection_id: this.collection_id,
      count: 10,
      filter: 'language:en,source_type:mainstream',
      aggregation: 'filter(enriched_title.entities.type::Company).term(enriched_title.entities.text).timeslice(crawl_date,1day).term(enriched_text.sentiment.document.label)'
    }, queryOpts);

    return params;
  }
};
