import { Crawler } from "./common/crawler"

export class ShortlistedProfiles extends Crawler {

    constructor (initialUrl, params) {
        super (initialUrl, params);
    }

    run () {
        this.clickLink({
            stepDescription: 'Navigate to Shortlisted profiles page',
            selector: '#fixed-div_search > div.fleft.paddl20 > a:nth-child(3)'
        });

        this.then(function () {
            var shortlistedHref = this.getElementAttribute('#leftpanellinkscontainer > div:nth-child(1) > div.paddt10.paddb5.fright.shortlist_download > a', "href");
            this.echo(shortlistedHref);
            this.download(shortlistedHref, crawler.config.dirs.downloads + '/shortlistedProfiles.xls');
        });
    }
}