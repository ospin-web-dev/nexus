(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"nexus.html\">nexus</a>","id":"nexus","children":[{"label":"<a href=\"nexus.auth.html\">auth</a>","id":"nexus.auth","children":[]},{"label":"<a href=\"nexus.command.html\">command</a>","id":"nexus.command","children":[{"label":"<a href=\"nexus.command.device.html\">device</a>","id":"nexus.command.device","children":[{"label":"<a href=\"nexus.command.device.process.html\">process</a>","id":"nexus.command.device.process","children":[]}]}]},{"label":"<a href=\"nexus.dataPoints.html\">dataPoints</a>","id":"nexus.dataPoints","children":[{"label":"<a href=\"nexus.dataPoints.downloadRequest.html\">downloadRequest</a>","id":"nexus.dataPoints.downloadRequest","children":[]},{"label":"<a href=\"nexus.dataPoints.materializedView.html\">materializedView</a>","id":"nexus.dataPoints.materializedView","children":[]}]},{"label":"<a href=\"nexus.device.html\">device</a>","id":"nexus.device","children":[{"label":"<a href=\"nexus.device.access.html\">access</a>","id":"nexus.device.access","children":[]},{"label":"<a href=\"nexus.device.certificate.html\">certificate</a>","id":"nexus.device.certificate","children":[]},{"label":"<a href=\"nexus.device.functionality.html\">functionality</a>","id":"nexus.device.functionality","children":[{"label":"<a href=\"nexus.device.functionality.calibration.html\">calibration</a>","id":"nexus.device.functionality.calibration","children":[]}]},{"label":"<a href=\"nexus.device.functionalityGraph.html\">functionalityGraph</a>","id":"nexus.device.functionalityGraph","children":[{"label":"<a href=\"nexus.device.functionalityGraph.configuration.html\">configuration</a>","id":"nexus.device.functionalityGraph.configuration","children":[]},{"label":"<a href=\"nexus.device.functionalityGraph.functionalityConfiguration.html\">functionalityConfiguration</a>","id":"nexus.device.functionalityGraph.functionalityConfiguration","children":[]},{"label":"<a href=\"nexus.device.functionalityGraph.ports.html\">ports</a>","id":"nexus.device.functionalityGraph.ports","children":[]}]},{"label":"<a href=\"nexus.device.manufacturer.html\">manufacturer</a>","id":"nexus.device.manufacturer","children":[{"label":"<a href=\"nexus.device.manufacturer.deviceType.html\">deviceType</a>","id":"nexus.device.manufacturer.deviceType","children":[]}]}]},{"label":"deviceDescription","id":"nexus.deviceDescription","children":[{"label":"<a href=\"nexus.deviceDescription.functionalityDescription.html\">functionalityDescription</a>","id":"nexus.deviceDescription.functionalityDescription","children":[]},{"label":"<a href=\"nexus.deviceDescription.template.html\">template</a>","id":"nexus.deviceDescription.template","children":[]}]},{"label":"<a href=\"nexus.event.html\">event</a>","id":"nexus.event","children":[{"label":"<a href=\"nexus.event.device.html\">device</a>","id":"nexus.event.device","children":[]}]},{"label":"<a href=\"nexus.licence.html\">licence</a>","id":"nexus.licence","children":[{"label":"<a href=\"nexus.licence.type.html\">type</a>","id":"nexus.licence.type","children":[]}]},{"label":"<a href=\"nexus.log.html\">log</a>","id":"nexus.log","children":[{"label":"<a href=\"nexus.log.device.html\">device</a>","id":"nexus.log.device","children":[]}]},{"label":"<a href=\"nexus.process.html\">process</a>","id":"nexus.process","children":[{"label":"<a href=\"nexus.process.access.html\">access</a>","id":"nexus.process.access","children":[]},{"label":"<a href=\"nexus.process.annotation.html\">annotation</a>","id":"nexus.process.annotation","children":[]},{"label":"<a href=\"nexus.process.functionality.html\">functionality</a>","id":"nexus.process.functionality","children":[{"label":"<a href=\"nexus.process.functionality.image.html\">image</a>","id":"nexus.process.functionality.image","children":[]}]},{"label":"<a href=\"nexus.process.physicalMapping.html\">physicalMapping</a>","id":"nexus.process.physicalMapping","children":[]},{"label":"<a href=\"nexus.process.preview.html\">preview</a>","id":"nexus.process.preview","children":[]},{"label":"<a href=\"nexus.process.reports.html\">reports</a>","id":"nexus.process.reports","children":[]},{"label":"<a href=\"nexus.process.snapshot.html\">snapshot</a>","id":"nexus.process.snapshot","children":[]}]},{"label":"<a href=\"nexus.uIConfig.html\">uIConfig</a>","id":"nexus.uIConfig","children":[{"label":"<a href=\"nexus.uIConfig.userFctGraphUIConfig.html\">userFctGraphUIConfig</a>","id":"nexus.uIConfig.userFctGraphUIConfig","children":[]},{"label":"<a href=\"nexus.uIConfig.userUIConfig.html\">userUIConfig</a>","id":"nexus.uIConfig.userUIConfig","children":[]}]},{"label":"<a href=\"nexus.user.html\">user</a>","id":"nexus.user","children":[{"label":"<a href=\"nexus.user.device.html\">device</a>","id":"nexus.user.device","children":[]},{"label":"<a href=\"nexus.user.licence.html\">licence</a>","id":"nexus.user.licence","children":[]},{"label":"<a href=\"nexus.user.notifications.html\">notifications</a>","id":"nexus.user.notifications","children":[]},{"label":"<a href=\"nexus.user.preview.html\">preview</a>","id":"nexus.user.preview","children":[]},{"label":"<a href=\"nexus.user.pusher.html\">pusher</a>","id":"nexus.user.pusher","children":[{"label":"<a href=\"nexus.user.pusher.subscriptions.html\">subscriptions</a>","id":"nexus.user.pusher.subscriptions","children":[{"label":"<a href=\"nexus.user.pusher.subscriptions.device.html\">device</a>","id":"nexus.user.pusher.subscriptions.device","children":[{"label":"<a href=\"nexus.user.pusher.subscriptions.device.process.html\">process</a>","id":"nexus.user.pusher.subscriptions.device.process","children":[]}]}]}]}]},{"label":"<a href=\"nexus.utils.html\">utils</a>","id":"nexus.utils","children":[]}]}],
        openedIcon: ' &#x21e3;',
        saveState: false,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);
